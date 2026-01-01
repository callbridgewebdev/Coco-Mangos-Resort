-- Create accommodations table
CREATE TABLE IF NOT EXISTS accommodations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  capacity INT NOT NULL DEFAULT 2,
  price_per_night DECIMAL(10, 2) NOT NULL,
  description TEXT,
  amenities TEXT,
  image_url VARCHAR(500),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Insert default accommodations
INSERT INTO accommodations (name, capacity, price_per_night, description, amenities, image_url) 
VALUES 
  ('Premium Beach Suite', 2, 499.00, 'Luxurious suites with private terraces and ocean views', 'AC, WiFi, TV, Mini Bar, Sea View', '/premium-beach-suite.jpg'),
  ('Deluxe Ocean View', 3, 399.00, 'Spacious rooms with modern amenities and ocean vistas', 'AC, WiFi, TV, Desk, Work Space', '/deluxe-ocean-view.jpg'),
  ('Beachfront Villa', 4, 599.00, 'Premium villa with direct beach access', 'AC, WiFi, TV, Kitchen, Pool Access', '/beachfront-villa.jpg'),
  ('Tropical Suite', 2, 349.00, 'Cozy rooms with tropical garden views', 'AC, WiFi, TV, Garden View', '/tropical-suite.jpg'),
  ('Standard Room', 2, 249.00, 'Comfortable rooms with essential amenities', 'AC, WiFi, TV, Fan', '/standard-room.jpg')
ON CONFLICT DO NOTHING;
