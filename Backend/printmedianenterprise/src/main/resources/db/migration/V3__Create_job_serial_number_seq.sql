-- Create the sequence table for job serial numbers
CREATE TABLE IF NOT EXISTS job_serial_number_seq (
    next_val BIGINT NOT NULL
) ENGINE=InnoDB;

-- Initialize with 1
INSERT INTO job_serial_number_seq VALUES (1)
ON DUPLICATE KEY UPDATE next_val = next_val;
