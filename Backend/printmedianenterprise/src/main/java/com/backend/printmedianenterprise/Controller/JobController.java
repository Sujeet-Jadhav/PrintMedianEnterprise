package com.backend.printmedianenterprise.Controller;

import com.backend.printmedianenterprise.Dto.JobManagementDto;
import com.backend.printmedianenterprise.Dto.JobStatusDto;
import com.backend.printmedianenterprise.Dto.PaymentStatusDto;
import com.backend.printmedianenterprise.Entity.JobManagement;
import com.backend.printmedianenterprise.Enum.JobStatus;
import com.backend.printmedianenterprise.Services.JobManagement.JobService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/jobs")
@RequiredArgsConstructor
public class JobController {

    private final JobService jobService;

    @PostMapping("/create_job")
    public ResponseEntity<JobManagement> createJob(@Valid @RequestBody JobManagementDto jobManagementDto){
        JobManagement jobManagement = jobService.createJob(jobManagementDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(jobManagement);
    }

    @GetMapping("/all_jobs")
    public ResponseEntity<List<JobManagement>> getAllJobs(){
        List<JobManagement> jobs = jobService.getAllJobs();
        return ResponseEntity.status(HttpStatus.OK).body(jobs);
    }

    @PutMapping("/delete_job")
    public ResponseEntity<String> deleteJob(@Valid @RequestBody JobStatusDto jobStatusDto){
        if (jobStatusDto == null || jobStatusDto.getId() == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Job ID must be provided");
        }
        if(jobStatusDto.getJobStatus() != JobStatus.DELETED) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Job status must be DELETED to delete a job");
        }
        return jobService.deleteJob(jobStatusDto) ?
                ResponseEntity.status(HttpStatus.OK).body("Job deleted successfully") :
                ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Failed to delete job");
    }

    @PutMapping("/update_job_status")
    public ResponseEntity<String> updateJobStatus(@Valid @RequestBody JobStatusDto jobStatusDto) {
        return jobService.updateJobStatus(jobStatusDto) ?
                ResponseEntity.ok("Job status updated successfully") :
                ResponseEntity.badRequest().body("Failed to update job status");
    }

    // Payment Status Update (separate endpoint)
    @PutMapping("/update_payment_status")
    public ResponseEntity<String> updatePaymentStatus(@Valid @RequestBody PaymentStatusDto paymentStatusDto) {
        return jobService.updatePaymentStatus(paymentStatusDto) ?
                ResponseEntity.ok("Payment status updated successfully") :
                ResponseEntity.badRequest().body("Failed to update payment status");
    }
}
