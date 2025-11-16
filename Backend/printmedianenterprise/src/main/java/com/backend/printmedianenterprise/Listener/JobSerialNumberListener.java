package com.backend.printmedianenterprise.Listener;


import com.backend.printmedianenterprise.Entity.JobManagement;
import jakarta.persistence.PrePersist;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

@Component
public class JobSerialNumberListener {

    private static JdbcTemplate jdbcTemplate;

    @Autowired
    public void setJdbcTemplate(JdbcTemplate jdbcTemplate) {
        JobSerialNumberListener.jdbcTemplate = jdbcTemplate;
    }

    @PrePersist
    public void generateSerialNumber(JobManagement job) {
        if (job.getSerialNumber() == null) {
            Long nextVal = jdbcTemplate.queryForObject(
                    "SELECT next_val FROM job_serial_number_seq FOR UPDATE",
                    Long.class
            );

            long current = (nextVal == null) ? 1L : nextVal;

            jdbcTemplate.update(
                    "UPDATE job_serial_number_seq SET next_val = ?",
                    current + 1
            );

            job.setSerialNumber(nextVal);
        }
    }
}