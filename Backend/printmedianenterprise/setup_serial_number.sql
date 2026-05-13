-- Manual SQL Setup for Serial Number Auto-Increment
-- Run this script directly in MySQL Workbench or MySQL CLI
-- Database: print_median_enterprise

USE print_median_enterprise;

-- Step 1: Create sequence table if not exists
CREATE TABLE IF NOT EXISTS job_serial_number_seq (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY
) ENGINE=InnoDB;

-- Step 2: Drop existing trigger if any
DROP TRIGGER IF EXISTS before_job_insert;

-- Step 3: Create the trigger for auto-generating serial numbers
DELIMITER $$

CREATE TRIGGER before_job_insert
BEFORE INSERT ON jobs
FOR EACH ROW
BEGIN
    IF NEW.serial_number IS NULL THEN
        INSERT INTO job_serial_number_seq VALUES (NULL);
        SET NEW.serial_number = LAST_INSERT_ID();
    END IF;
END$$

DELIMITER ;

-- Step 4: Verify the trigger was created
SHOW TRIGGERS LIKE 'jobs';

-- Step 5: Test with a sample query (optional - don't run if you don't want test data)
-- SELECT 'Setup completed successfully!' AS Status;

