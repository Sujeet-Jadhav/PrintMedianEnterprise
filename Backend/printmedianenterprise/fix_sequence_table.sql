-- Quick fix script to create the job_serial_number_seq table
USE print_median_enterprise;

-- Drop the table if it exists with wrong structure
DROP TABLE IF EXISTS job_serial_number_seq;

-- Create the table with correct structure
CREATE TABLE job_serial_number_seq (
    next_val BIGINT NOT NULL DEFAULT 1
) ENGINE=InnoDB;

-- Initialize with starting value
INSERT INTO job_serial_number_seq (next_val) VALUES (1);

