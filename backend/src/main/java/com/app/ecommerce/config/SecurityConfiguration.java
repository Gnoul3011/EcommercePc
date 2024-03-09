package com.app.ecommerce.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.servlet.HandlerExceptionResolver;

import lombok.RequiredArgsConstructor;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfiguration {

  @Autowired
  @Qualifier("handlerExceptionResolver")
  private HandlerExceptionResolver exceptionResolver;

  private final AuthenticationProvider authenticationProvider;

  @Bean
  public JwtAuthenticationFilter jwtAuthFilter() {
    return new JwtAuthenticationFilter(exceptionResolver);
  }

  @Bean
  public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
    http
        .cors()
        .and()
        .csrf()
        .disable()
        .authorizeHttpRequests()
        .requestMatchers("/user/*/updatepassword", "/auth/**", "/brand/**", "/category/**", "/product/**", "/product-info/**", "/product-warranty/**", "/mail/**", "/warranty-period/**").permitAll()
        .requestMatchers("/order/getOrder", "/order/update-status", "/order/getOrderDetail", "/order/create", "/orderinformation/**", "/user/**", "/userDetail/**").authenticated()
        .requestMatchers("/order/export/excel", "/order/getMonthlyRevenue", "/order/getTrustedBuyers", "/order/getAllOrder", "/brand/create", 
        "/brand/*/active", "/brand/delete", "/brand/*/update",
        "/category/create", "/category/*/update", "/category/*/activeCategory", "/category/deleteCategory",
        "/product/create", "/product/update", "/product/delete", "/product/undo-delete", "/product/getTopSelling",
        "/product-info/add-info", "/product-info/update", "/product-info/delete",
        "/product-warranty/create",
        "/user/update-role", "/user/delete", "/user/*/active",
        "/warranty-period/create", "/warranty-period/*/update", "/warranty-period/delete", "/warranty-period/*/active"
        ).hasAuthority("ADMIN")
        .requestMatchers("/order/export/excel", "/order/getMonthlyRevenue", "/order/getTrustedBuyers", "/order/getAllOrder", "/brand/create", 
        "/brand/*/active", "/brand/delete", "/brand/*/update",
        "/category/create", "/category/*/update", "/category/*/activeCategory", "/category/deleteCategory",
        "/product/create", "/product/update", "/product/delete", "/product/undo-delete", "/product/getTopSelling",
        "/product-info/add-info", "/product-info/update", "/product-info/delete",
        "/product-warranty/create",
        "/user/update-role", "/user/delete", "/user/*/active",
        "/warranty-period/create", "/warranty-period/*/update", "/warranty-period/delete", "/warranty-period/*/active"
        ).hasAuthority("MANAGER")
        .and()
        .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
        .and()
        .authenticationProvider(authenticationProvider)
        .addFilterBefore(jwtAuthFilter(), UsernamePasswordAuthenticationFilter.class);

    return http.build();
  }
}
