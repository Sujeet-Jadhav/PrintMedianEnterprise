-- Setup auto-incrementing serial number for jobs table
-- Create a sequence table for generating serial numbers

CREATE TABLE IF NOT EXISTS job_serial_number_seq (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY
) ENGINE=InnoDB;


