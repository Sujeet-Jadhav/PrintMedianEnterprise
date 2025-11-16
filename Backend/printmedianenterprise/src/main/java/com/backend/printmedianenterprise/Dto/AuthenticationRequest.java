package com.backend.printmedianenterprise.Dto;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Data
public class AuthenticationRequest {

	private String userName;
	
	private String password;

}
