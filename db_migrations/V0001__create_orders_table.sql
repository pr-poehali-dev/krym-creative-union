CREATE TABLE IF NOT EXISTS orders (
    id SERIAL PRIMARY KEY,
    event_date DATE NOT NULL,
    event_location TEXT NOT NULL,
    event_time TIME NOT NULL,
    contact_type VARCHAR(20) NOT NULL,
    contact VARCHAR(255) NOT NULL,
    promo_code VARCHAR(100),
    discount INTEGER DEFAULT 0,
    total_price INTEGER NOT NULL,
    items JSONB NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_orders_created_at ON orders(created_at DESC);
CREATE INDEX idx_orders_event_date ON orders(event_date);
