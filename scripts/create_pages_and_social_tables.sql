-- Create pages table for Page Management
CREATE TABLE IF NOT EXISTS pages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  page_name VARCHAR(100) NOT NULL UNIQUE,
  title VARCHAR(255) NOT NULL,
  content TEXT,
  is_enabled BOOLEAN DEFAULT true,
  meta_description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create social_accounts table for Social Account Management
CREATE TABLE IF NOT EXISTS social_accounts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  platform VARCHAR(50) NOT NULL UNIQUE,
  display_name VARCHAR(100) NOT NULL,
  url TEXT NOT NULL,
  icon_name VARCHAR(50) NOT NULL,
  is_enabled BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert default pages
INSERT INTO pages (page_name, title, content, is_enabled, meta_description) VALUES
('tour-packages', 'Tour Packages', 'Explore our exciting tour packages and adventures.', true, 'Discover amazing tour packages at our resort'),
('gallery', 'Photo Gallery', 'View stunning photos of our resort and amenities.', true, 'Browse our photo gallery'),
('reviews', 'Guest Reviews', 'Read what our guests are saying about their experience.', true, 'Guest reviews and testimonials'),
('contact', 'Contact Us', 'Get in touch with us for inquiries and reservations.', true, 'Contact information and inquiry form'),
('about', 'About Us', 'Learn more about our resort, mission, and values.', true, 'About our resort and services')
ON CONFLICT (page_name) DO NOTHING;

-- Insert default social accounts
INSERT INTO social_accounts (platform, display_name, url, icon_name, is_enabled, sort_order) VALUES
('facebook', 'Facebook', 'https://facebook.com', 'Facebook', true, 1),
('x', 'X (Twitter)', 'https://x.com', 'Twitter', true, 2),
('youtube', 'YouTube', 'https://youtube.com', 'Youtube', true, 3),
('google-maps', 'Google Maps', 'https://maps.google.com', 'MapPin', true, 4),
('whatsapp', 'WhatsApp', 'https://wa.me/', 'MessageCircle', true, 5),
('email', 'Email', 'mailto:info@resort.com', 'Mail', true, 6)
ON CONFLICT (platform) DO NOTHING;

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_pages_enabled ON pages(is_enabled);
CREATE INDEX IF NOT EXISTS idx_social_enabled ON social_accounts(is_enabled);
CREATE INDEX IF NOT EXISTS idx_social_sort ON social_accounts(sort_order);
