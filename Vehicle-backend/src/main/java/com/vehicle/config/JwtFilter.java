package com.vehicle.config;

import com.vehicle.serviceImpl.CustomerDetailsService;
import com.vehicle.utils.JwtUtils;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
@Component
public class JwtFilter extends OncePerRequestFilter {
    @Autowired
    private JwtUtils jwtUtils;

    @Autowired
    private CustomerDetailsService customerDetailsService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        System.out.println("Inside JwtFilter");
        //getting token send by user
        final String authHeader= request.getHeader("Authorization");
        final String token;
        final String userName;
        System.out.println(authHeader);
        //checking authHeader validation
        if(authHeader==null || authHeader.isBlank()){
            System.out.println("Invalid authHeader");
            filterChain.doFilter(request,response);
            return;
        }

        //extracting token starts with Bearer so substring
        token=authHeader.substring(7);

        //extracting username from token
        userName= jwtUtils.getUserNameFromToken(token);

        //if username is present and SecurityContextHolder don't holds user info
        System.out.println(SecurityContextHolder.getContext());
        if(userName!=null && SecurityContextHolder.getContext().getAuthentication()==null){

            // search userDetails with username
            UserDetails userDetails=this.customerDetailsService.loadUserByUsername(userName);
            System.out.println("loading UserDetails");
            //validating token username,time,sign
            if(jwtUtils.isTokenValid(userDetails,token)){
                System.out.println("Valid token");
                //make SecurityContext empty to store new UserDetails
                SecurityContext securityContext=SecurityContextHolder.createEmptyContext();

                //it authenticates user along with roles and it's value is stored in SecurityContext
                UsernamePasswordAuthenticationToken authToken=new UsernamePasswordAuthenticationToken(userDetails,null,userDetails.getAuthorities());

                //acts bridge btn servlet and spring class basically converts them
                authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

                //setting securityContext with authenticated user
                securityContext.setAuthentication(authToken);

                //setting SecurityContextHolder with auth user so it will not be null
                SecurityContextHolder.setContext(securityContext);
            }
            filterChain.doFilter(request,response);
        }
        System.out.println("out of jwt filter");

    }
}
