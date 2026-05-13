package com.backend.printmedianenterprise.Dto;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Data
public class SignupRequest {

	private String email;
	
	private String password;
	
	private String name;
	
	private String mobile;


}
