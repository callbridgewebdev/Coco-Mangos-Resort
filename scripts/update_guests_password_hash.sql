-- Add password_hash column to guests table if it doesn't exist
ALTER TABLE guests 
ADD COLUMN IF NOT EXISTS password_hash character varying;

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_guests_email ON guests(email);
CREATE INDEX IF NOT EXISTS idx_guests_username ON guests(username);
