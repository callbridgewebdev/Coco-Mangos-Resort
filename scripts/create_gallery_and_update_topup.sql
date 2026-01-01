-- Create gallery table for photo management
CREATE TABLE IF NOT EXISTS gallery (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  image_url TEXT NOT NULL,
  category VARCHAR(100),
  sort_order INTEGER DEFAULT 0,
  is_published BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW()
);

-- Add indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_gallery_category ON gallery(category);
CREATE INDEX IF NOT EXISTS idx_gallery_published ON gallery(is_published);
CREATE INDEX IF NOT EXISTS idx_gallery_sort_order ON gallery(sort_order);

-- Update top_up_transactions table to add reference number and receipt fields
ALTER TABLE top_up_transactions 
ADD COLUMN IF NOT EXISTS reference_number VARCHAR(255),
ADD COLUMN IF NOT EXISTS receipt_url TEXT,
ADD COLUMN IF NOT EXISTS admin_notes TEXT,
ADD COLUMN IF NOT EXISTS approved_by UUID,
ADD COLUMN IF NOT EXISTS approved_at TIMESTAMP WITHOUT TIME ZONE;

-- Add index for reference number lookups
CREATE INDEX IF NOT EXISTS idx_topup_reference ON top_up_transactions(reference_number);
CREATE INDEX IF NOT EXISTS idx_topup_status ON top_up_transactions(status);

-- Insert default gallery images
INSERT INTO gallery (title, description, image_url, category, sort_order) VALUES
('Beach Paradise', 'Pristine white sand beach with crystal clear waters', '/gallery-beach-1.jpg', 'beach', 1),
('Sunset Beach', 'Beautiful sunset view from our beachfront', '/gallery-beach-2.jpg', 'beach', 2),
('Fine Dining', 'Exquisite dining experience with ocean views', '/gallery-dining-1.jpg', 'dining', 3),
('Tropical Garden', 'Lush tropical gardens throughout the property', '/gallery-garden-1.jpg', 'garden', 4),
('Night Ambiance', 'Romantic evening atmosphere at the resort', '/gallery-night-1.jpg', 'ambiance', 5),
('Infinity Pool', 'Stunning infinity pool overlooking the ocean', '/gallery-pool-1.jpg', 'pool', 6),
('Luxury Room', 'Spacious and elegantly appointed guest rooms', '/gallery-room-1.jpg', 'rooms', 7),
('Spa Retreat', 'Rejuvenating spa treatments and wellness', '/gallery-spa-1.jpg', 'spa', 8);
