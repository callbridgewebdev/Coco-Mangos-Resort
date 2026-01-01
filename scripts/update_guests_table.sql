-- Add username and remember_me fields to guests table
ALTER TABLE guests ADD COLUMN IF NOT EXISTS username VARCHAR(255) UNIQUE;
ALTER TABLE guests ADD COLUMN IF NOT EXISTS remember_me_token VARCHAR(255);
ALTER TABLE guests ADD COLUMN IF NOT EXISTS created_at_timestamp TIMESTAMP DEFAULT NOW();

-- Create unique index for username and email
CREATE UNIQUE INDEX IF NOT EXISTS idx_guests_username ON guests(username);
CREATE UNIQUE INDEX IF NOT EXISTS idx_guests_email ON guests(email);
