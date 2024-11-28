CREATE TABLE actions (
    id SERIAL PRIMARY KEY,
    product_id INT NOT NULL,
    shop_id INT,
    action VARCHAR(255) NOT NULL,
    details JSONB NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    FOREIGN KEY (product_id) REFERENCES products (id) ON DELETE CASCADE
);