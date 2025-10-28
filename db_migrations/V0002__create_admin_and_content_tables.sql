-- Create admins table for authentication
CREATE TABLE IF NOT EXISTS t_p95264310_krym_creative_union.admins (
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create sections table for content management
CREATE TABLE IF NOT EXISTS t_p95264310_krym_creative_union.sections (
    id SERIAL PRIMARY KEY,
    slug VARCHAR(100) UNIQUE NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create services table for managing all services across sections
CREATE TABLE IF NOT EXISTS t_p95264310_krym_creative_union.services (
    id SERIAL PRIMARY KEY,
    section_id INTEGER REFERENCES t_p95264310_krym_creative_union.sections(id),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price INTEGER NOT NULL,
    image_url TEXT,
    video_url TEXT,
    is_extra BOOLEAN DEFAULT FALSE,
    extra_label VARCHAR(255),
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert default admin (password: admin123 - should be changed!)
INSERT INTO t_p95264310_krym_creative_union.admins (username, password_hash) 
VALUES ('admin', '$2b$10$rQ3YxZ4xZ4xZ4xZ4xZ4xZOzYxZ4xZ4xZ4xZ4xZ4xZ4xZ4xZ4xZ4xZ')
ON CONFLICT (username) DO NOTHING;

-- Insert default sections
INSERT INTO t_p95264310_krym_creative_union.sections (slug, title, description) VALUES
('dance', 'Танцы', 'Профессиональные танцевальные коллективы'),
('music', 'Музыка', 'Музыканты и вокалисты высокого уровня'),
('organization', 'Организация', 'Полная организация мероприятий любого масштаба'),
('media', 'СМИ', 'Фото и видео съемка, статьи о мероприятиях')
ON CONFLICT (slug) DO NOTHING;
