package com.backend.printmedianenterprise.Controller;

import java.io.IOException;
import java.util.Optional;

import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.backend.printmedianenterprise.Dto.AuthenticationRequest;
import com.backend.printmedianenterprise.Dto.SignupRequest;
import com.backend.printmedianenterprise.Dto.UserDto;
import com.backend.printmedianenterprise.Entity.User;
import com.backend.printmedianenterprise.Repository.UserRepository;
import com.backend.printmedianenterprise.Services.Auth.AuthService;
import com.backend.printmedianenterprise.Util.JwtUtil;

import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

@CrossOrigin
@RestController
@RequiredArgsConstructor
public class AuthController {

	private final AuthenticationManager authenticationManager;

	private final UserDetailsService userDetailsService;

	private final UserRepository userRepository;

	private final JwtUtil jwtUtil;

	private final AuthService authService;

	public static final String TOKEN_PREFIX = "Bearer ";
	public static final String HEADER_STRING = "Authorization";

	@PostMapping("/authenticate")
	public void createAuthenticationToken(@RequestBody AuthenticationRequest authenticationRequest,
			HttpServletResponse response) throws IOException, JSONException {
		try {
			authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
					authenticationRequest.getUserName(), authenticationRequest.getPassword()));
		} catch (BadCredentialsException excep) {
			throw new BadCredentialsException("Incorrect Username and Password");
		}

		final UserDetails userDetails = userDetailsService.loadUserByUsername(authenticationRequest.getUserName());
		Optional<User> optionalUser = userRepository.findFirstByEmail(userDetails.getUsername());
		final String jwt = jwtUtil.generateToken(userDetails.getUsername());

		if (optionalUser.isPresent()) {
			response.getWriter().write(new JSONObject().put("userId", optionalUser.get().getId())
					.put("role", optionalUser.get().getRole()).toString());
		}
		
		response.addHeader("Access-Control-Expose-Headers", "Authorization");
		response.addHeader("Access-Control-Allow-Headers", "Authorization, X-PINGOTHER, Origin, X-Requested-With, Content-Type, Accept, X-Custom-header");

		response.addHeader(HEADER_STRING, TOKEN_PREFIX + jwt);
	}

	@PostMapping("/sign-up")
	public ResponseEntity<?> signupUser(@RequestBody SignupRequest signupRequest) {
		if(authService.hasUserWithEmail(signupRequest.getEmail())) {
			return new ResponseEntity<>("User Already Exists",HttpStatus.NOT_ACCEPTABLE);
		}
		
		UserDto userDto = authService.createUser(signupRequest);
		return new ResponseEntity<>(userDto, HttpStatus.OK);
	}

}
