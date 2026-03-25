-- Portfolio v2 — schema MySQL
-- Run once: mysql -u root -p < sql/schema.sql

CREATE DATABASE IF NOT EXISTS portfolio_v2 CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE portfolio_v2;

-- Projects
CREATE TABLE IF NOT EXISTS projects (
  id VARCHAR(64) PRIMARY KEY,
  title VARCHAR(128) NOT NULL,
  description_fr TEXT NOT NULL,
  description_en TEXT NOT NULL,
  img VARCHAR(255) NOT NULL DEFAULT '',
  link VARCHAR(255) NOT NULL DEFAULT '',
  github VARCHAR(255) NOT NULL DEFAULT '',
  featured BOOLEAN NOT NULL DEFAULT FALSE,
  spotlight BOOLEAN NOT NULL DEFAULT FALSE,
  category ENUM('ecosystem', 'tool', 'formation') NOT NULL DEFAULT 'ecosystem',
  sort_order INT NOT NULL DEFAULT 0
) ENGINE=InnoDB;

-- Project techno tags (many-to-many)
CREATE TABLE IF NOT EXISTS project_technos (
  project_id VARCHAR(64) NOT NULL,
  techno_name VARCHAR(64) NOT NULL,
  sort_order INT NOT NULL DEFAULT 0,
  PRIMARY KEY (project_id, techno_name),
  FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- Stack / Technologies
CREATE TABLE IF NOT EXISTS technologies (
  name VARCHAR(64) PRIMARY KEY,
  img VARCHAR(512) NOT NULL DEFAULT '',
  category VARCHAR(32) NOT NULL DEFAULT 'tools'
) ENGINE=InnoDB;

-- Infrastructure
CREATE TABLE IF NOT EXISTS infra_meta (
  id INT PRIMARY KEY DEFAULT 1,
  description_fr TEXT NOT NULL,
  description_en TEXT NOT NULL,
  specs JSON NOT NULL
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS infra_services (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(128) NOT NULL,
  description_fr TEXT NOT NULL,
  description_en TEXT NOT NULL,
  url VARCHAR(255) NOT NULL DEFAULT '',
  img VARCHAR(512) NOT NULL DEFAULT '',
  sort_order INT NOT NULL DEFAULT 0
) ENGINE=InnoDB;

-- Create app user
CREATE USER IF NOT EXISTS 'portfolio'@'%' IDENTIFIED BY '__SECRET_PORTFOLIO_DB_PASSWORD__';
GRANT SELECT, INSERT, UPDATE, DELETE ON portfolio_v2.* TO 'portfolio'@'%';
FLUSH PRIVILEGES;
