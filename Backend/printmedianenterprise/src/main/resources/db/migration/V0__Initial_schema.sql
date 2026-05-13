-- Initial database schema for Print Median Enterprise

-- Create users table
CREATE TABLE IF NOT EXISTS users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(255),
    mobile VARCHAR(20),
    role VARCHAR(50) NOT NULL,
    INDEX idx_email (email),
    INDEX idx_role (role)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Create product_category table
CREATE TABLE IF NOT EXISTS product_category (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    status INT DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_name (name),
    INDEX idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Create product table
CREATE TABLE IF NOT EXISTS product (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    img LONGBLOB,
    category_id BIGINT NOT NULL,
    FOREIGN KEY (category_id) REFERENCES product_category(id) ON DELETE CASCADE,
    INDEX idx_category_id (category_id),
    INDEX idx_name (name)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Create jobs table
CREATE TABLE IF NOT EXISTS jobs (
    id BINARY(16) PRIMARY KEY,
    serial_number BIGINT NOT NULL UNIQUE,
    client_name VARCHAR(255),
    description TEXT,
    amount DOUBLE,
    created_by VARCHAR(255),
    job_status VARCHAR(50),
    payment_status VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL,
    INDEX idx_serial_number (serial_number),
    INDEX idx_client_name (client_name),
    INDEX idx_job_status (job_status),
    INDEX idx_payment_status (payment_status),
    INDEX idx_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Create job serial number sequence table (required by JobSerialNumberListener)
CREATE TABLE IF NOT EXISTS job_serial_number_seq (
    next_val BIGINT NOT NULL DEFAULT 1
) ENGINE=InnoDB;

-- Initialize sequence table with starting value
INSERT INTO job_serial_number_seq (next_val) VALUES (1);

-- Create master_setting table
CREATE TABLE IF NOT EXISTS master_setting (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    project_name VARCHAR(255),
    about TEXT,
    email VARCHAR(255),
    phone VARCHAR(50),
    address TEXT,
    facebook VARCHAR(255),
    twitter VARCHAR(255),
    instagram VARCHAR(255),
    whatsapp VARCHAR(50),
    logo LONGBLOB,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Create contact_us table
CREATE TABLE IF NOT EXISTS contact_us (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    mobile VARCHAR(20),
    message TEXT,
    status VARCHAR(50) DEFAULT 'Pending',
    admin_remark TEXT,
    INDEX idx_status (status),
    INDEX idx_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insert default admin user (password: admin123 - BCrypt encoded)
INSERT INTO users (email, password, name, mobile, role)
VALUES ('admin@printmedian.com', '$2a$10$xN3LI/AjqicFYZFruSwve.681477XaVNaUQbr1gioaWPn4t1KsnmG', 'Admin User', '1234567890', 'ADMIN')
ON DUPLICATE KEY UPDATE email=email;

