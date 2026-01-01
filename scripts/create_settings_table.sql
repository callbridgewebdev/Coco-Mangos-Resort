-- Create settings table for application configuration
CREATE TABLE IF NOT EXISTS settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  setting_key VARCHAR(100) UNIQUE NOT NULL,
  setting_value TEXT NOT NULL,
  description VARCHAR(255),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Insert default settings
INSERT INTO settings (setting_key, setting_value, description) 
VALUES 
  ('recaptcha_enabled', 'true', 'Enable or disable reCAPTCHA v2 for authentication'),
  ('site_name', 'Resort PWA', 'Application site name'),
  ('maintenance_mode', 'false', 'Enable or disable maintenance mode')
ON CONFLICT (setting_key) DO NOTHING;

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_settings_key ON settings(setting_key);
