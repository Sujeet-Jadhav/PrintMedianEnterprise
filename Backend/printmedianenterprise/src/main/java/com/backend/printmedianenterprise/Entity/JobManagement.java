package com.backend.printmedianenterprise.Entity;

import com.backend.printmedianenterprise.Enum.JobStatus;
import com.backend.printmedianenterprise.Enum.PaymentStatus;
import com.backend.printmedianenterprise.Listener.JobSerialNumberListener;
import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Data
@Table(name = "jobs")
@EntityListeners(JobSerialNumberListener.class)
public class JobManagement {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(updatable = false, nullable = false)
    private UUID id;


    @Column(name = "serial_number", nullable = false, unique = true)
    private Long serialNumber;

    private String clientName;

    private String description;

    private Double amount;

    private String createdBy;

    @Enumerated(EnumType.STRING)
    private JobStatus jobStatus;

    @Enumerated(EnumType.STRING)
    private PaymentStatus paymentStatus;

    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}
