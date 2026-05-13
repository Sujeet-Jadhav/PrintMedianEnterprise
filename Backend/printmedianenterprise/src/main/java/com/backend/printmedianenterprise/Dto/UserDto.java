package com.backend.printmedianenterprise.Dto;

import com.backend.printmedianenterprise.Enum.UserRole;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Data
public class UserDto {

	private Long id;

	private String email;

	private String password;

	private String name;
	
	private String mobile;


}
