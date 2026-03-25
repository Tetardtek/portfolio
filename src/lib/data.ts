import { getPool } from './db'
import type { Project, Technology, Infrastructure, ProjectCategory } from '@/types'
import type { RowDataPacket } from 'mysql2'

// ─── Projects ───────────────────────────────────────────────

interface ProjectRow extends RowDataPacket {
  id: string
  title: string
  description_fr: string
  description_en: string
  img: string
  link: string
  github: string
  featured: number
  spotlight: number
  category: ProjectCategory
  sort_order: number
}

interface TechnoRow extends RowDataPacket {
  project_id: string
  techno_name: string
}

export async function getProjects(): Promise<Project[]> {
  const pool = getPool()
  const [rows] = await pool.query<ProjectRow[]>(
    'SELECT * FROM projects ORDER BY sort_order ASC'
  )
  const [technos] = await pool.query<TechnoRow[]>(
    'SELECT project_id, techno_name FROM project_technos ORDER BY sort_order ASC'
  )

  const technoMap = new Map<string, string[]>()
  for (const t of technos) {
    const list = technoMap.get(t.project_id) ?? []
    list.push(t.techno_name)
    technoMap.set(t.project_id, list)
  }

  return rows.map((r) => ({
    id: r.id,
    title: r.title,
    description: { fr: r.description_fr, en: r.description_en },
    techno: technoMap.get(r.id) ?? [],
    img: r.img,
    link: r.link,
    github: r.github,
    featured: !!r.featured,
    spotlight: !!r.spotlight,
    category: r.category,
  }))
}

export async function saveProjects(projects: Project[]): Promise<void> {
  const pool = getPool()
  const conn = await pool.getConnection()
  try {
    await conn.beginTransaction()

    await conn.query('DELETE FROM project_technos')
    await conn.query('DELETE FROM projects')

    for (let i = 0; i < projects.length; i++) {
      const p = projects[i]
      await conn.query(
        `INSERT INTO projects (id, title, description_fr, description_en, img, link, github, featured, spotlight, category, sort_order)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [p.id, p.title, p.description.fr, p.description.en, p.img, p.link, p.github, p.featured ?? false, p.spotlight ?? false, p.category ?? 'ecosystem', i]
      )
      for (let j = 0; j < p.techno.length; j++) {
        await conn.query(
          'INSERT INTO project_technos (project_id, techno_name, sort_order) VALUES (?, ?, ?)',
          [p.id, p.techno[j], j]
        )
      }
    }

    await conn.commit()
  } catch (e) {
    await conn.rollback()
    throw e
  } finally {
    conn.release()
  }
}

// ─── Stack ──────────────────────────────────────────────────

interface TechRow extends RowDataPacket {
  name: string
  img: string
  category: string
}

export async function getStack(): Promise<Technology[]> {
  const pool = getPool()
  const [rows] = await pool.query<TechRow[]>('SELECT * FROM technologies ORDER BY name ASC')
  return rows.map((r) => ({ name: r.name, img: r.img, category: r.category }))
}

export async function saveStack(technologies: Technology[]): Promise<void> {
  const pool = getPool()
  const conn = await pool.getConnection()
  try {
    await conn.beginTransaction()
    await conn.query('DELETE FROM technologies')
    for (const t of technologies) {
      await conn.query(
        'INSERT INTO technologies (name, img, category) VALUES (?, ?, ?)',
        [t.name, t.img, t.category]
      )
    }
    await conn.commit()
  } catch (e) {
    await conn.rollback()
    throw e
  } finally {
    conn.release()
  }
}

// ─── Infrastructure ─────────────────────────────────────────

interface InfraMetaRow extends RowDataPacket {
  description_fr: string
  description_en: string
  specs: string
}

interface InfraServiceRow extends RowDataPacket {
  name: string
  description_fr: string
  description_en: string
  url: string
  img: string
}

export async function getInfrastructure(): Promise<Infrastructure> {
  const pool = getPool()
  const [metaRows] = await pool.query<InfraMetaRow[]>('SELECT * FROM infra_meta WHERE id = 1')
  const [serviceRows] = await pool.query<InfraServiceRow[]>(
    'SELECT * FROM infra_services ORDER BY sort_order ASC'
  )

  const meta = metaRows[0]
  return {
    description: { fr: meta?.description_fr ?? '', en: meta?.description_en ?? '' },
    specs: meta ? JSON.parse(typeof meta.specs === 'string' ? meta.specs : JSON.stringify(meta.specs)) : [],
    services: serviceRows.map((s) => ({
      name: s.name,
      description: { fr: s.description_fr, en: s.description_en },
      url: s.url || undefined,
      img: s.img,
    })),
  }
}

export async function saveInfrastructure(infra: Infrastructure): Promise<void> {
  const pool = getPool()
  const conn = await pool.getConnection()
  try {
    await conn.beginTransaction()

    await conn.query(
      `INSERT INTO infra_meta (id, description_fr, description_en, specs) VALUES (1, ?, ?, ?)
       ON DUPLICATE KEY UPDATE description_fr = VALUES(description_fr), description_en = VALUES(description_en), specs = VALUES(specs)`,
      [infra.description.fr, infra.description.en, JSON.stringify(infra.specs)]
    )

    await conn.query('DELETE FROM infra_services')
    for (let i = 0; i < infra.services.length; i++) {
      const s = infra.services[i]
      await conn.query(
        'INSERT INTO infra_services (name, description_fr, description_en, url, img, sort_order) VALUES (?, ?, ?, ?, ?, ?)',
        [s.name, s.description.fr, s.description.en, s.url ?? '', s.img, i]
      )
    }

    await conn.commit()
  } catch (e) {
    await conn.rollback()
    throw e
  } finally {
    conn.release()
  }
}
