CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    plu VARCHAR(50) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL
);

CREATE TABLE stocks (
    id SERIAL PRIMARY KEY,
    product_id INT NOT NULL,
    shop_id INT NOT NULL,
    stock_on_shelf INT NOT NULL DEFAULT 0,
    stock_in_order INT NOT NULL DEFAULT 0,
    FOREIGN KEY (product_id) REFERENCES products (id) ON DELETE CASCADE
);