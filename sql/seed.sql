-- Portfolio v2 — seed data
-- Run after schema.sql: mysql -u root -p portfolio_v2 < sql/seed.sql

USE portfolio_v2;

-- ============================================================
-- Projects
-- ============================================================

INSERT INTO projects (id, title, description_fr, description_en, img, link, github, featured, spotlight, category, sort_order) VALUES
('superoauth', 'SuperOAuth',
 'Serveur d''authentification multi-tenant avec PKCE, isolation par tenant, lookup dynamique DB+Redis. 4 clients en production (OriginsDigital, TetaRdPG, Clickerz, Sakuin). Frontend SvelteKit avec dashboard, docs et landing B2B.',
 'Multi-tenant authentication server with PKCE, tenant isolation, dynamic DB+Redis lookup. 4 clients in production (OriginsDigital, TetaRdPG, Clickerz, Sakuin). SvelteKit frontend with dashboard, docs and B2B landing.',
 '/assets/img/superoauth.png', 'https://superoauth.tetardtek.com', 'https://github.com/Tetardtek/Super-OAuth',
 TRUE, TRUE, 'ecosystem', 1),

('tetardpg', 'TetaRdPG',
 'RPG narratif avec lore original, combat tactique tour par tour, 50 quêtes en arcs narratifs, 5 zones/biomes, boutique, achievements, HUD et god mode testing. 18 modules NestJS, auth déléguée à SuperOAuth via PKCE.',
 'Narrative RPG with original lore, turn-based tactical combat, 50 quests in story arcs, 5 zones/biomes, shop, achievements, HUD and god mode testing. 18 NestJS modules, auth delegated to SuperOAuth via PKCE.',
 '/assets/img/tetardpg.png', 'https://tetardpg.tetardtek.com', '',
 TRUE, FALSE, 'ecosystem', 2),

('clickerz', 'Clickerz',
 'Clicker idle game avec save serveur autorité, synchronisation multi-onglets (blur/focus 500ms), anti-triche delta côté serveur. Settings page avec link/unlink de providers OAuth.',
 'Idle clicker game with authoritative server save, multi-tab sync (blur/focus 500ms), server-side delta anti-cheat. Settings page with OAuth provider link/unlink.',
 '/assets/img/clickerz.png', 'https://clickerz.tetardtek.com', '',
 TRUE, FALSE, 'ecosystem', 3),

('sakuin', 'Sakuin',
 'Tracker manga/anime gamifié avec recherche AniList, listes personnalisées, profil XP et système de progression. Self-hostable, auth SuperOAuth PKCE. Sprint 1 livré.',
 'Gamified manga/anime tracker with AniList search, custom lists, XP profile and progression system. Self-hostable, SuperOAuth PKCE auth. Sprint 1 shipped.',
 '/assets/img/sakuin.png', 'https://sakuin.tetardtek.com', '',
 TRUE, FALSE, 'ecosystem', 4),

('origins-digital', 'Origin''s Digital',
 'Plateforme vidéo générique — socle technique pour HowToBrain. Intégration SuperOAuth PKCE avec 4 providers (Discord, GitHub, Google, Twitch). CI/CD Gitea automatisé.',
 'Generic video platform — technical foundation for HowToBrain. SuperOAuth PKCE integration with 4 providers (Discord, GitHub, Google, Twitch). Automated Gitea CI/CD.',
 '/assets/img/origins.png', 'https://originsdigital.tetardtek.com/', 'https://github.com/Tetardtek/P3-Originsdigital',
 TRUE, FALSE, 'ecosystem', 5),

('portfolio-v2', 'Portfolio v2',
 'Portfolio développeur full-stack avec panel d''administration complet, support bilingue et déploiement Docker sur VPS.',
 'Full-stack developer portfolio with complete admin panel, bilingual support and Docker deployment on VPS.',
 '/assets/img/portfolio.png', 'https://portfolio.tetardtek.com', 'https://github.com/Tetardtek/portfolio-v2',
 FALSE, FALSE, 'tool', 10),

('stupeflix', 'Stupeflix',
 'Quiz et Battle game sur l''univers Harry Potter. Projet React avec gestion d''état et animations.',
 'Quiz and Battle game set in the Harry Potter universe. React project with state management and animations.',
 '/assets/img/hogwart.png', 'https://stupeflix.tetardtek.com/', 'https://github.com/Tetardtek/P2-Stupeflix',
 FALSE, FALSE, 'formation', 20),

('loreal', 'L''Oréal Professionnel',
 'Plateforme B2B avec chatbot IA intégré, développée lors d''un hackathon — finaliste.',
 'B2B platform with integrated AI chatbot, built during a hackathon — finalist.',
 '/assets/img/loreal.png', 'https://b2b-loreal.remote-fr-2.wilders.dev/', 'https://github.com/Tetardtek/H2-LorealProfesionnel',
 FALSE, FALSE, 'formation', 21),

('xmass-click', 'Xmass Click',
 'Clicker game de Noël développé lors d''un hackathon — 1ère place. Interface festive et mécanique addictive.',
 'Christmas clicker game built during a hackathon — 1st place. Festive UI and addictive mechanics.',
 '/assets/img/xmass.png', 'https://xmass.tetardtek.com/', 'https://github.com/Tetardtek/H1-XmassClick',
 FALSE, FALSE, 'formation', 22),

('toutdoux', 'Toutdoux',
 'Todo list interactive avec gestion des tâches en JavaScript vanilla.',
 'Interactive todo list with task management in vanilla JavaScript.',
 '/assets/img/toutdoux.png', 'https://jurascript.tetardtek.com/JavaScript/toutdoux.html', 'https://github.com/Tetardtek/P1-ToutDoux',
 FALSE, FALSE, 'formation', 23),

('jurascript', 'JuraScript',
 'Site de présentation hébergeant plusieurs mini-projets JavaScript interactifs.',
 'Showcase site hosting several interactive JavaScript mini-projects.',
 '/assets/img/jurascript.png', 'https://jurascript.tetardtek.com/', 'https://github.com/Tetardtek/JuraScript',
 FALSE, FALSE, 'formation', 24);

-- ============================================================
-- Project technos
-- ============================================================

INSERT INTO project_technos (project_id, techno_name, sort_order) VALUES
-- SuperOAuth
('superoauth', 'TypeScript', 1), ('superoauth', 'Node.js', 2), ('superoauth', 'Express', 3),
('superoauth', 'SvelteKit', 4), ('superoauth', 'MySQL', 5), ('superoauth', 'Redis', 6),
('superoauth', 'JWT', 7), ('superoauth', 'Docker', 8), ('superoauth', 'Apache', 9),
('superoauth', 'SSL Let''s Encrypt', 10), ('superoauth', 'Claude', 11), ('superoauth', 'Git', 12),
('superoauth', 'Linux', 13),
-- TetaRdPG
('tetardpg', 'TypeScript', 1), ('tetardpg', 'NestJS', 2), ('tetardpg', 'React', 3),
('tetardpg', 'TypeORM', 4), ('tetardpg', 'MySQL', 5), ('tetardpg', 'Docker', 6),
('tetardpg', 'Apache', 7), ('tetardpg', 'SSL Let''s Encrypt', 8), ('tetardpg', 'JWT', 9),
('tetardpg', 'Claude', 10), ('tetardpg', 'Git', 11), ('tetardpg', 'Linux', 12),
-- Clickerz
('clickerz', 'TypeScript', 1), ('clickerz', 'React', 2), ('clickerz', 'Node.js', 3),
('clickerz', 'Express', 4), ('clickerz', 'MySQL', 5), ('clickerz', 'Docker', 6),
('clickerz', 'Apache', 7), ('clickerz', 'SSL Let''s Encrypt', 8), ('clickerz', 'JWT', 9),
('clickerz', 'Claude', 10), ('clickerz', 'Git', 11), ('clickerz', 'Linux', 12),
-- Sakuin
('sakuin', 'TypeScript', 1), ('sakuin', 'NestJS', 2), ('sakuin', 'React', 3),
('sakuin', 'TypeORM', 4), ('sakuin', 'MySQL', 5), ('sakuin', 'Docker', 6),
('sakuin', 'Apache', 7), ('sakuin', 'SSL Let''s Encrypt', 8), ('sakuin', 'JWT', 9),
('sakuin', 'Claude', 10), ('sakuin', 'Git', 11), ('sakuin', 'Linux', 12),
-- OriginsDigital
('origins-digital', 'TypeScript', 1), ('origins-digital', 'React', 2), ('origins-digital', 'Node.js', 3),
('origins-digital', 'Express', 4), ('origins-digital', 'MySQL', 5), ('origins-digital', 'Docker', 6),
('origins-digital', 'Apache', 7), ('origins-digital', 'SSL Let''s Encrypt', 8), ('origins-digital', 'JWT', 9),
('origins-digital', 'Claude', 10), ('origins-digital', 'Git', 11), ('origins-digital', 'Linux', 12),
-- Portfolio
('portfolio-v2', 'TypeScript', 1), ('portfolio-v2', 'React', 2), ('portfolio-v2', 'Next.js', 3),
('portfolio-v2', 'Tailwind CSS', 4), ('portfolio-v2', 'Node.js', 5), ('portfolio-v2', 'Docker', 6),
('portfolio-v2', 'Apache', 7), ('portfolio-v2', 'SSL Let''s Encrypt', 8), ('portfolio-v2', 'JWT', 9),
('portfolio-v2', 'Claude', 10), ('portfolio-v2', 'Git', 11), ('portfolio-v2', 'Linux', 12),
('portfolio-v2', 'GitHub Actions', 13),
-- Stupeflix
('stupeflix', 'React', 1), ('stupeflix', 'JavaScript', 2), ('stupeflix', 'SASS', 3), ('stupeflix', 'CSS', 4),
-- L'Oréal
('loreal', 'React', 1), ('loreal', 'Node.js', 2), ('loreal', 'Express', 3), ('loreal', 'MySQL', 4), ('loreal', 'SASS', 5),
-- Xmass Click
('xmass-click', 'React', 1), ('xmass-click', 'JavaScript', 2), ('xmass-click', 'SASS', 3), ('xmass-click', 'CSS', 4),
-- Toutdoux
('toutdoux', 'HTML', 1), ('toutdoux', 'CSS', 2), ('toutdoux', 'JavaScript', 3),
-- JuraScript
('jurascript', 'HTML', 1), ('jurascript', 'CSS', 2), ('jurascript', 'JavaScript', 3);

-- ============================================================
-- Technologies (stack)
-- ============================================================

INSERT INTO technologies (name, img, category) VALUES
('TypeScript', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg', 'languages'),
('JavaScript', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg', 'languages'),
('Python', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg', 'languages'),
('Lua', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/lua/lua-original.svg', 'languages'),
('HTML', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg', 'languages'),
('CSS', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg', 'languages'),
('React', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg', 'frontend'),
('Next.js', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg', 'frontend'),
('Tailwind CSS', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg', 'frontend'),
('Svelte', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/svelte/svelte-original.svg', 'frontend'),
('SvelteKit', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/svelte/svelte-original.svg', 'frontend'),
('SASS', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sass/sass-original.svg', 'frontend'),
('NestJS', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nestjs/nestjs-original.svg', 'backend'),
('Node.js', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg', 'backend'),
('Express', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg', 'backend'),
('TypeORM', 'https://api.iconify.design/logos:typeorm.svg', 'backend'),
('MySQL', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg', 'DB'),
('MariaDB', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mariadb/mariadb-original.svg', 'DB'),
('Redis', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg', 'DB'),
('SQLite', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sqlite/sqlite-original.svg', 'DB'),
('Dolt', 'https://www.dolthub.com/blog/static/dolt-logo-7c3c4be38c0c0e7c3e0c0c0e7c3c4be3.svg', 'DB'),
('Apache', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apache/apache-original.svg', 'devops'),
('Docker', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg', 'devops'),
('Nginx', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nginx/nginx-original.svg', 'devops'),
('GitHub Actions', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/githubactions/githubactions-original.svg', 'devops'),
('JWT', 'https://cdn.worldvectorlogo.com/logos/jwt-3.svg', 'devops'),
('SSL Let''s Encrypt', 'https://api.iconify.design/logos:letsencrypt.svg', 'devops'),
('Bcrypt', 'https://raw.githubusercontent.com/iffat04/cryptography_generator/refs/heads/main/bcrypt.svg', 'devops'),
('Git', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg', 'tools'),
('VSCode', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg', 'tools'),
('Swagger', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/swagger/swagger-original.svg', 'tools'),
('Postman', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg', 'tools'),
('Figma', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg', 'tools'),
('Claude', 'https://unpkg.com/@lobehub/icons-static-svg@1.82.0/icons/claude-color.svg', 'AI'),
('GitHub Copilot', 'https://unpkg.com/@lobehub/icons-static-svg@1.82.0/icons/copilot-color.svg', 'AI'),
('Gemini', 'https://unpkg.com/@lobehub/icons-static-svg@1.82.0/icons/gemini-color.svg', 'AI'),
('ChatGPT', 'https://api.iconify.design/logos:openai-icon.svg', 'AI'),
('LM Studio', 'https://unpkg.com/@lobehub/icons-static-svg@1.82.0/icons/lmstudio.svg', 'AI'),
('Ollama', 'https://api.iconify.design/simple-icons:ollama.svg', 'AI'),
('Linux', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg', 'os'),
('Windows', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/windows8/windows8-original.svg', 'os');

-- ============================================================
-- Infrastructure
-- ============================================================

INSERT INTO infra_meta (id, description_fr, description_en, specs) VALUES
(1,
 'VPS auto-hébergé sous Linux de services en production.',
 'Self-hosted VPS running Linux with services in production.',
 '["Linux", "Docker", "SSL Let''s Encrypt", "Node.js", "MySQL", "Apache"]');

INSERT INTO infra_services (name, description_fr, description_en, url, img, sort_order) VALUES
('Uptime Kuma',
 'Monitoring en temps réel de tous mes services avec alertes et historique de disponibilité.',
 'Real-time monitoring of all services with alerts and uptime history.',
 'https://up.tetardtek.com', 'https://api.iconify.design/simple-icons:uptimekuma.svg', 1),
('Affine',
 'Workspace collaboratif tout-en-un (docs, kanban, whiteboard) — alternative self-hosted à Notion.',
 'All-in-one collaborative workspace (docs, kanban, whiteboard) — self-hosted Notion alternative.',
 'https://affine.tetardtek.com', 'https://cdn.brandfetch.io/idmp1jw9T-/theme/dark/logo.svg?c=1bxid64Mup7aczewSAYMX&t=1768772750514', 2),
('Habitica',
 'Gestionnaire d''habitudes et de tâches gamifié — instance privée pour suivre ma progression quotidienne.',
 'Gamified habit and task manager — private instance to track daily progress.',
 'https://habitica.tetardtek.com', 'https://cdn.jsdelivr.net/gh/callback-io/allogo@main/public/logos/habitica/icon.svg', 3),
('ConvertX',
 'Convertisseur de fichiers self-hosted — images, vidéos, documents, sans envoyer de données à un tiers.',
 'Self-hosted file converter — images, videos, documents, without sending data to a third party.',
 'https://convert.tetardtek.com', '', 4),
('Stirling PDF',
 'Suite d''outils PDF self-hosted — fusion, découpe, compression, conversion, tout en local.',
 'Self-hosted PDF toolkit — merge, split, compress, convert, all locally.',
 'https://pdf.tetardtek.com', '/assets/img/stirling-pdf.png', 5),
('Excalidraw',
 'Outil de dessin et de schématisation collaboratif self-hosted — idéal pour les diagrammes d''architecture.',
 'Self-hosted collaborative drawing and diagramming tool — ideal for architecture diagrams.',
 'https://draw.tetardtek.com', '/assets/excalidraw.svg', 6),
('n8n',
 'Automatisation de workflows — équivalent Zapier self-hosted. Connecte mes outils et déclenche des actions automatiques.',
 'Workflow automation — self-hosted Zapier alternative. Connects tools and triggers automated actions.',
 'https://n8n.tetardtek.com', 'https://unpkg.com/@lobehub/icons-static-svg@1.82.0/icons/n8n-color.svg', 7);
