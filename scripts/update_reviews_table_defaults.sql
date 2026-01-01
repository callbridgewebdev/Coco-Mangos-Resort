-- Update reviews table to set default values for rating and comment
-- This ensures all new reviews start with consistent defaults

-- Add default values and constraints to rating column
ALTER TABLE reviews
DROP CONSTRAINT IF EXISTS reviews_rating_check,
ADD CONSTRAINT reviews_rating_check CHECK (rating >= 0 AND rating <= 5);

-- Update existing reviews with NULL rating to 0
UPDATE reviews SET rating = 0 WHERE rating IS NULL;

-- Set default values for future inserts
ALTER TABLE reviews
ALTER COLUMN rating SET DEFAULT 0,
ALTER COLUMN comment SET DEFAULT '';

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_reviews_room_id ON reviews(room_id);
CREATE INDEX IF NOT EXISTS idx_reviews_guest_id ON reviews(guest_id);
CREATE INDEX IF NOT EXISTS idx_reviews_booking_id ON reviews(booking_id);
CREATE INDEX IF NOT EXISTS idx_reviews_created_at ON reviews(created_at DESC);
