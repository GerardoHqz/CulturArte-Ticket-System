package com.grupo04.culturarte.configs;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import static org.springframework.security.config.Customizer.withDefaults;

import com.grupo04.culturarte.models.entities.Users;
import com.grupo04.culturarte.services.UserService;
import com.grupo04.culturarte.utils.JWTTokenFilter;

import jakarta.servlet.http.HttpServletResponse;

@Configuration
@EnableWebSecurity
@EnableWebMvc
public class WebSecurityConfiguration implements WebMvcConfigurer {

	@Autowired
	private PasswordEncoder passwordEncoder;

	@Autowired
	private UserService userService;
	
	@Autowired
	private JWTTokenFilter filter;

	@Bean
	AuthenticationManager authenticationManagerBean(HttpSecurity http) throws Exception {
	    AuthenticationManagerBuilder managerBuilder 
	    	= http.getSharedObject(AuthenticationManagerBuilder.class);
	    
	    managerBuilder
	    	.userDetailsService(identifier -> {
	    		Users user = userService.findOneByEmail(identifier);
	    		
	    		if(user == null)
	    			throw new UsernameNotFoundException("User: " + identifier + ", not found!");
	    		
	    		return user;
	    	})
	    	.passwordEncoder(passwordEncoder);
	    
	    return managerBuilder.build();
	}

	@Override
	public void addCorsMappings(CorsRegistry registry) {
		registry.addMapping("/**")
        .allowedMethods("GET", "POST", "PUT", "DELETE", "PATCH");
	}
	
	@Bean
	SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
			//Http login and cors disabled
	    http.httpBasic(withDefaults()).csrf(csrf -> csrf.disable());
	    
	    //Route filter
	    http.cors(Customizer.withDefaults()).authorizeHttpRequests(auth -> {
			auth.requestMatchers("/auth/**").permitAll();
			auth.requestMatchers("/event/**").permitAll();
			auth.requestMatchers("/image/**").permitAll();
			auth.requestMatchers("/swagger-ui/index.html").permitAll();
			auth.requestMatchers("/login/**", "/login?error/**").permitAll();
			auth.requestMatchers("/home").permitAll();
			auth.anyRequest().authenticated();
		});
	    
	    //Statelessness
	    http.sessionManagement(management -> management.sessionCreationPolicy(SessionCreationPolicy.STATELESS));
	    
	    //UnAunthorized handler
	    http.exceptionHandling(handling -> handling.authenticationEntryPoint((req, res, ex) -> {
	        res.sendError(
	        		HttpServletResponse.SC_UNAUTHORIZED,
	        		"Auth fail!"
	        	);
	    }));
	    
	    //JWT filter
	    http.addFilterBefore(filter, UsernamePasswordAuthenticationFilter.class);

			return http.build();
	}

}
