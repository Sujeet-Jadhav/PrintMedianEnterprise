// java
package com.backend.printmedianenterprise.Controller;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.*;

import com.backend.printmedianenterprise.Dto.AuthenticationRequest;
import com.backend.printmedianenterprise.Dto.SignupRequest;
import com.backend.printmedianenterprise.Dto.UserDto;
import com.backend.printmedianenterprise.Entity.User;
import com.backend.printmedianenterprise.Repository.UserRepository;
import com.backend.printmedianenterprise.Services.Auth.AuthService;
import com.backend.printmedianenterprise.Util.JwtUtil;

import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@CrossOrigin
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/auth")
@Slf4j
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final UserDetailsService userDetailsService;
    private final UserRepository userRepository;
    private final JwtUtil jwtUtil;
    private final AuthService authService;

    public static final String TOKEN_PREFIX = "Bearer ";
    public static final String HEADER_STRING = "Authorization";

    private static final ObjectMapper MAPPER = new ObjectMapper();

    @PostMapping("/login")
    public ResponseEntity<?> createAuthenticationToken(@RequestBody AuthenticationRequest authenticationRequest) {
        log.info("Authentication request received for user: {}", authenticationRequest.getUserName());
        try {
            // Verify user exists before attempting authentication
            Optional<User> preUser = userRepository.findFirstByEmail(authenticationRequest.getUserName());
            if (preUser.isEmpty()) {
                log.warn("Authentication failed: user not found: {}", authenticationRequest.getUserName());
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body(Map.of("error", "User not found"));
            }
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                    authenticationRequest.getUserName(), authenticationRequest.getPassword()));
        } catch (BadCredentialsException excep) {
            log.error("Authentication failed for user: {}", authenticationRequest.getUserName());
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("error", "Incorrect Username and Password"));
        }

        final UserDetails userDetails = userDetailsService.loadUserByUsername(authenticationRequest.getUserName());
        Optional<User> optionalUser = userRepository.findFirstByEmail(userDetails.getUsername());
        final String jwt = jwtUtil.generateToken(userDetails.getUsername());

        if (optionalUser.isPresent()) {
            Map<String, Object> body = new HashMap<>();
            body.put("userId", optionalUser.get().getId());
            body.put("role", optionalUser.get().getRole());
            body.put("token", jwt);
//            body.put("tokenType", "Bearer");

            log.info("Authentication successful for user: {}", authenticationRequest.getUserName());
            return ResponseEntity.ok()
                    .header(HEADER_STRING, TOKEN_PREFIX + jwt)
                    .header("Access-Control-Expose-Headers", "Authorization")
                    .body(body);
        }

        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(Map.of("error", "User not found"));
    }

    @PostMapping("/sign_up")
    public ResponseEntity<?> signupUser(@RequestBody SignupRequest signupRequest) {
        log.info("Sign-up request received for email: {}", signupRequest.getEmail());
        if(authService.hasUserWithEmail(signupRequest.getEmail())) {
            log.warn("Sign-up failed: User already exists with email: {}", signupRequest.getEmail());
            return new ResponseEntity<>("User Already Exists",HttpStatus.NOT_ACCEPTABLE);
        }

        UserDto userDto = authService.createUser(signupRequest);
        log.info("User created successfully with email: {}", signupRequest.getEmail());
        return new ResponseEntity<>(userDto, HttpStatus.OK);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<String> handleException(Exception e) {
        log.error("Exception in AuthController: ", e);
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("Error: " + e.getMessage());
    }

}