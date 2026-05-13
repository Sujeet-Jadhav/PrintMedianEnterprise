-- Create trigger to auto-generate serial number for new job insertions

DROP TRIGGER IF EXISTS before_job_insert;

CREATE TRIGGER before_job_insert
BEFORE INSERT ON jobs
FOR EACH ROW
BEGIN
    IF NEW.serial_number IS NULL THEN
        INSERT INTO job_serial_number_seq VALUES (NULL);
        SET NEW.serial_number = LAST_INSERT_ID();
    END IF;
END;

