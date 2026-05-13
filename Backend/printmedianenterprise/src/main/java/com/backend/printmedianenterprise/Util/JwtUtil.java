package com.backend.printmedianenterprise.Util;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

import org.springframework.security.core.userdetails.UserDetails;

@Component
public class JwtUtil {

	public static final String SECRET = "PrintMedianEnterpriseUNDERPixelCopiersBYSujeet";
	
	public String generateToken(String userName) {
		Map<String,Object> claims = new HashMap<>();
		 return createToken(claims,userName);
	}

	private String createToken(Map<String, Object> claims, String userName) {
		return Jwts.builder()
				.claims(claims)
				.subject(userName)
				.issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis() + 1000L * 60 * 60 * 24 * 30)) // 30 days
				.signWith(getSignKey())
				.compact();
	}
	
	private Key getSignKey() {
		byte[] keyBytes = Decoders.BASE64.decode(SECRET);
		return Keys.hmacShaKeyFor(keyBytes);
	}
	
	public String extractUserName(String token) {
		return extractClaim(token,Claims::getSubject);
	}
	
	private <T> T extractClaim(String token,Function<Claims,T> claimsResolver) {
		final Claims claims = extractAllClaims(token);
		return claimsResolver.apply(claims);
	}
	
	private Claims extractAllClaims(String token) {
		return Jwts.parser()
				.verifyWith(Keys.hmacShaKeyFor(Decoders.BASE64.decode(SECRET)))
				.build()
				.parseSignedClaims(token)
				.getPayload();
	}
	
	private Boolean isTokenExpired(String token) {
		return extractExpiration(token).before(new Date());
	}
	
	public Date extractExpiration (String token) {
		return extractClaim(token,Claims::getExpiration);
	}
	
	public Boolean validateTokens(String token,UserDetails userDetails) {
		final String userName = extractUserName(token);
		return (userName.equals(userDetails.getUsername()) && !isTokenExpired(token));
	}
	
	
}
