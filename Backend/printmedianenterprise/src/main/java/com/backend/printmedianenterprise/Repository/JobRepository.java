package com.backend.printmedianenterprise.Repository;

import com.backend.printmedianenterprise.Entity.JobManagement;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.UUID;

public interface JobRepository extends JpaRepository<JobManagement, UUID> {
}
