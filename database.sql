
-- Database creation
CREATE DATABASE IF NOT EXISTS writerhub_db;
USE writerhub_db;

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Writers table
CREATE TABLE IF NOT EXISTS writers (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  specialty VARCHAR(100) NOT NULL,
  bio TEXT,
  email VARCHAR(100) NOT NULL,
  phone VARCHAR(20),
  image_url VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Writer education table
CREATE TABLE IF NOT EXISTS writer_education (
  id INT PRIMARY KEY AUTO_INCREMENT,
  writer_id INT,
  degree VARCHAR(255) NOT NULL,
  FOREIGN KEY (writer_id) REFERENCES writers(id) ON DELETE CASCADE
);

-- Writer expertise table
CREATE TABLE IF NOT EXISTS writer_expertise (
  id INT PRIMARY KEY AUTO_INCREMENT,
  writer_id INT,
  skill VARCHAR(100) NOT NULL,
  FOREIGN KEY (writer_id) REFERENCES writers(id) ON DELETE CASCADE
);

-- Writer samples table
CREATE TABLE IF NOT EXISTS writer_samples (
  id INT PRIMARY KEY AUTO_INCREMENT,
  writer_id INT,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  link VARCHAR(255),
  FOREIGN KEY (writer_id) REFERENCES writers(id) ON DELETE CASCADE
);

-- Ratings table
CREATE TABLE IF NOT EXISTS ratings (
  id INT PRIMARY KEY AUTO_INCREMENT,
  writer_id INT,
  user_id INT,
  rating INT NOT NULL CHECK (rating BETWEEN 1 AND 5),
  comment TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (writer_id) REFERENCES writers(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Products table
CREATE TABLE IF NOT EXISTS products (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  category VARCHAR(50) NOT NULL,
  image_url VARCHAR(255),
  stock INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Orders table
CREATE TABLE IF NOT EXISTS orders (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT,
  total_amount DECIMAL(10,2) NOT NULL,
  status VARCHAR(20) NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
);

-- Order items table
CREATE TABLE IF NOT EXISTS order_items (
  id INT PRIMARY KEY AUTO_INCREMENT,
  order_id INT,
  product_id INT,
  quantity INT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE SET NULL
);

-- Sample data insertion
-- Insert sample writers
INSERT INTO writers (name, specialty, bio, email, phone, image_url) VALUES 
('Dr. Sarah Johnson', 'Academic Research & Essays', 'Ph.D. in Literature with 10+ years of academic writing experience. Specializes in research papers, literature reviews, and critical analyses.', 'sarah.johnson@writerhub.com', '+1 (555) 123-4567', 'https://images.unsplash.com/photo-1494790108377-be9c29b29330'),
('Michael Chen', 'Technical Writing & Documentation', 'Engineering background with expertise in technical documentation, user manuals, and process guides. Fluent in explaining complex concepts clearly.', 'michael.chen@writerhub.com', '+1 (555) 234-5678', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d'),
('Olivia Martinez', 'Creative Writing & Literature', 'MFA in Creative Writing. Published author specializing in fiction, poetry, and creative non-fiction. Offers developmental editing and proofreading.', 'olivia.martinez@writerhub.com', '+1 (555) 345-6789', 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e');

-- Insert sample products
INSERT INTO products (name, description, price, category, image_url, stock) VALUES
('Premium Laptop', 'High-performance laptop for all your computing needs with fast processor and ample storage.', 899.99, 'laptops', 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853', 15),
('Wireless Headphones', 'Noise-cancelling wireless headphones with premium sound quality and long battery life.', 129.99, 'accessories', 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e', 30),
('Smart Tablet', 'Versatile tablet for productivity and entertainment with a crisp display and responsive touch.', 349.99, 'tablets', 'https://images.unsplash.com/photo-1542751110-97427bbecf20', 20);

-- Insert sample users (password: 'password123' hashed)
INSERT INTO users (name, email, password_hash) VALUES 
('John Doe', 'john@example.com', '$2a$12$1234567890abcdefghijkl'),
('Jane Smith', 'jane@example.com', '$2a$12$abcdefghijklmnopqrstuvw');

-- Insert sample ratings
INSERT INTO ratings (writer_id, user_id, rating, comment) VALUES
(1, 1, 5, 'Dr. Johnson helped me with my dissertation literature review and provided invaluable insights.'),
(1, 2, 4, 'Very professional and responsive. Helped me structure my arguments more effectively.'),
(2, 1, 5, 'Michael created exceptional documentation for our product. His technical knowledge is impressive.');

-- Create indexes for better performance
CREATE INDEX idx_writers_specialty ON writers(specialty);
CREATE INDEX idx_products_category ON products(category);
CREATE INDEX idx_ratings_writer ON ratings(writer_id);
CREATE INDEX idx_order_items_order ON order_items(order_id);

-- Create view for writer ratings
CREATE VIEW writer_rating_summary AS
SELECT 
  w.id,
  w.name,
  AVG(r.rating) as average_rating,
  COUNT(r.id) as review_count
FROM writers w
LEFT JOIN ratings r ON w.id = r.writer_id
GROUP BY w.id, w.name;
