import { getProjects, getStack, getInfrastructure } from '@/lib/data'
import HomeClient from './HomeClient'

export const dynamic = 'force-dynamic'

export default async function Home() {
  const projects = await getProjects()
  const stack = await getStack()
  const infra = await getInfrastructure()

  const techCounts = projects.reduce<Record<string, number>>(
    (acc, p) => { p.techno.forEach((name) => { acc[name] = (acc[name] ?? 0) + 1 }); return acc },
    {}
  )

  return <HomeClient projects={projects} stack={stack} infra={infra} techCounts={techCounts} />
}
