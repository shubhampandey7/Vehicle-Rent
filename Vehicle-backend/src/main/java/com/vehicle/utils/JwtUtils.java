package com.vehicle.utils;



import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.io.Encoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import javax.crypto.KeyGenerator;
import javax.crypto.SecretKey;
import java.security.Key;
import java.security.NoSuchAlgorithmException;
import java.util.Base64;
import java.util.Date;
import java.util.function.Function;


@Component

public class JwtUtils {
    private String key="";

    // generating secret string with secrete keys
    public JwtUtils(){
        try {
            KeyGenerator keyGenerator=KeyGenerator.getInstance("HmacSHA256");
            SecretKey secretKey= keyGenerator.generateKey();
            key= Encoders.BASE64.encode(secretKey.getEncoded());
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException(e);
        }

    }

    //generating token
    public String generateToken(UserDetails userDetails){
        System.out.println("Token generating!!!");
       return Jwts.builder()
               .subject(userDetails.getUsername())
               .issuedAt(new Date(System.currentTimeMillis()))
               .expiration(new Date(System.currentTimeMillis()+1800000))
               .signWith(getKey())
               .compact();
    }

    // converting string to hmacShaKey
    private SecretKey getKey(){
        System.out.println("Getting SecretKey");
        byte[] keyByte=Decoders.BASE64.decode(key);
        return Keys.hmacShaKeyFor(keyByte);

    }

    //Extracting claims from token obtained from user
   public <T> T extractClaimsFromToken(String token,Function<Claims,T>claimResolver){
       System.out.println("extractClaimsFromToken");
        final Claims claims=getAllClaimsFromToken(token);
        return claimResolver.apply(claims);
   }

   // getting all claims info from token
    private Claims getAllClaimsFromToken(String token) {
        System.out.println("getAllClaimsFromToken");
        return Jwts.parser()
                .verifyWith(getKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }

    //extracting username from token
    public String getUserNameFromToken(String token){
        System.out.println("getUserNameFromToken");
        return extractClaimsFromToken(token,Claims::getSubject);
    }

    // validating token with username which is logged already with token passed by user
    public boolean isTokenValid(UserDetails userDetails,String token){
        System.out.println("Token Validation");
        String userName=getUserNameFromToken(token);
        return (userName.equals(userDetails.getUsername()) && !isTokenExpire(token));
    }

    //checking token is Expire or not
    private boolean isTokenExpire(String token) {
        return extractClaimsFromToken(token,Claims::getExpiration).before(new Date());
    }


}
