package com.backend.printmedianenterprise.Services.JobManagement;

import com.backend.printmedianenterprise.Dto.JobManagementDto;
import com.backend.printmedianenterprise.Dto.JobStatusDto;
import com.backend.printmedianenterprise.Dto.PaymentStatusDto;
import com.backend.printmedianenterprise.Entity.JobManagement;
import com.backend.printmedianenterprise.Enum.JobStatus;
import com.backend.printmedianenterprise.Enum.PaymentStatus;
import com.backend.printmedianenterprise.Exceptions.JobNotFoundException;
import com.backend.printmedianenterprise.Repository.JobRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class JobServiceImpl implements JobService{

    @Autowired
    private JobRepository jobRepository;


    @Override
    public JobManagement createJob(JobManagementDto jobManagementDto) {
        JobManagement jobManagement = new JobManagement();
        if(jobManagementDto == null){
            return null;
        }
        jobManagement.setClientName(jobManagementDto.getClientName());
        jobManagement.setAmount(jobManagementDto.getAmount());
        jobManagement.setDescription(jobManagementDto.getDescription());
        jobManagement.setCreatedBy(jobManagementDto.getCreatedBy());
        jobManagement.setJobStatus(JobStatus.PENDING);
        jobManagement.setPaymentStatus(PaymentStatus.PENDING);

        return jobRepository.save(jobManagement);
    }

    @Override
    public List<JobManagement> getAllJobs() {
        return jobRepository.findAll();
    }

    @Override
    public Boolean updateJobStatus(JobStatusDto jobStatusDto) {
        JobManagement jobManagement = jobRepository.findById(jobStatusDto.getId()).orElseThrow(() -> new JobNotFoundException("Job not found"));
        if (jobManagement == null) {
            return false;
        } else {
            jobManagement.setJobStatus(jobStatusDto.getJobStatus());
            jobRepository.save(jobManagement);
            return true;
        }
    }

    @Override
    public Boolean updatePaymentStatus(PaymentStatusDto paymentStatusDto) {
        JobManagement jobManagement = jobRepository.findById(paymentStatusDto.getId()).orElseThrow(() -> new JobNotFoundException("Job not found"));
        if (jobManagement == null) {
            return false;
        } else {
            jobManagement.setPaymentStatus(paymentStatusDto.getPaymentStatus());
            jobRepository.save(jobManagement);
            return true;
        }
    }

    @Override
    public Boolean deleteJob(JobStatusDto jobStatusDto) {
        if (jobStatusDto == null || jobStatusDto.getId() == null) {
            return false;
        }
        if (!jobRepository.existsById(jobStatusDto.getId())) {
            return false;
        }
        if(jobStatusDto.getJobStatus() != JobStatus.DELETED) {
            return false;
        }
        jobRepository.deleteById(jobStatusDto.getId());
        return true;
    }


}
