-- Add time slot columns to bookings table for hourly booking management
ALTER TABLE bookings 
ADD COLUMN IF NOT EXISTS check_in_time time,
ADD COLUMN IF NOT EXISTS check_out_time time,
ADD COLUMN IF NOT EXISTS booking_timezone varchar(50) DEFAULT 'Asia/Manila';

-- Create index for faster date queries
CREATE INDEX IF NOT EXISTS idx_bookings_dates ON bookings(check_in_date, check_out_date);
CREATE INDEX IF NOT EXISTS idx_bookings_room ON bookings(room_id, check_in_date);

-- Add comment
COMMENT ON COLUMN bookings.check_in_time IS 'Check-in time in 24-hour format';
COMMENT ON COLUMN bookings.check_out_time IS 'Check-out time in 24-hour format';
COMMENT ON COLUMN bookings.booking_timezone IS 'Timezone for the booking (default: Asia/Manila)';
