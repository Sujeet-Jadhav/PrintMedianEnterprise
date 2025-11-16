package com.backend.printmedianenterprise.Dto;

import com.backend.printmedianenterprise.Enum.JobStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class JobStatusDto {

    private UUID id;

    private JobStatus jobStatus;

}
