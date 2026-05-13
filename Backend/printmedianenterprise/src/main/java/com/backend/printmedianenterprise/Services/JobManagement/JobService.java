package com.backend.printmedianenterprise.Services.JobManagement;

import com.backend.printmedianenterprise.Dto.JobManagementDto;
import com.backend.printmedianenterprise.Dto.JobStatusDto;
import com.backend.printmedianenterprise.Dto.PaymentStatusDto;
import com.backend.printmedianenterprise.Entity.JobManagement;

import java.util.List;

public interface JobService {

    JobManagement createJob(JobManagementDto jobManagementDto);

    List<JobManagement> getAllJobs();

    Boolean updateJobStatus(JobStatusDto jobStatusDto);

    Boolean updatePaymentStatus(PaymentStatusDto paymentStatusDto);

    Boolean deleteJob(JobStatusDto jobStatusDto);
}
