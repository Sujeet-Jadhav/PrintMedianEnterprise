-- Database preparation script for Print Median Enterprise
-- Run this script to reset and prepare the database

-- Create database if it doesn't exist
CREATE DATABASE IF NOT EXISTS print_median_enterprise CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Use the database
USE print_median_enterprise;

-- Drop flyway_schema_history to allow fresh migration (only for development)
DROP TABLE IF EXISTS flyway_schema_history;

-- Create the job serial number sequence table (required by JobSerialNumberListener)
CREATE TABLE IF NOT EXISTS job_serial_number_seq (
    next_val BIGINT NOT NULL DEFAULT 1
) ENGINE=InnoDB;

-- Initialize with starting value if table is empty
INSERT INTO job_serial_number_seq (next_val)
VALUES (1)
ON DUPLICATE KEY UPDATE next_val = next_val;

-- Note: All other tables will be created by Hibernate with ddl-auto=update
-- To reset everything, you can drop all tables:
-- DROP TABLE IF EXISTS contact_us;
-- DROP TABLE IF EXISTS master_setting;
-- DROP TABLE IF EXISTS jobs;
-- DROP TABLE IF EXISTS product;
-- DROP TABLE IF EXISTS product_category;
-- DROP TABLE IF EXISTS users;
-- DROP TABLE IF EXISTS job_serial_number_seq;

