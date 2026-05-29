package online.nonamelab.WorkSite_Work.security.config;

import io.jsonwebtoken.security.Keys;
import jakarta.servlet.http.Cookie;
import online.nonamelab.WorkSite_Work.security.exception.CustomAccessDeniedHandler;
import online.nonamelab.WorkSite_Work.security.exception.CustomAuthenticationEntryPoint;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.NimbusJwtDecoder;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationConverter;
import org.springframework.security.oauth2.server.resource.authentication.JwtGrantedAuthoritiesConverter;
import org.springframework.security.oauth2.server.resource.web.BearerTokenResolver;
import org.springframework.security.oauth2.server.resource.web.DefaultBearerTokenResolver;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import javax.crypto.SecretKey;
import java.util.List;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

//    @Bean
//    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
//
//        return http
//                .csrf(csrf -> csrf.disable())
//                .sessionManagement(session ->
//                        session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
//                )
//                .authorizeHttpRequests(auth -> auth
//
//                        // EVERYTHING IS OPEN FOR NOW (DEV MODE)
//                        .anyRequest().permitAll()
//                )
//                .build();
//    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http,
                                                   BearerTokenResolver bearerTokenResolver,
                                                   JwtAuthenticationConverter jwtAuthenticationConverter,
                                                   CustomAuthenticationEntryPoint customAuthenticationEntryPoint,
                                                   CustomAccessDeniedHandler customAccessDeniedHandler) throws Exception {

        return http
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))
                .csrf(AbstractHttpConfigurer::disable)
                .sessionManagement(session ->
                        session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                )
                .exceptionHandling(ex -> ex
                        .authenticationEntryPoint(customAuthenticationEntryPoint)
                        .accessDeniedHandler(customAccessDeniedHandler))
                .authorizeHttpRequests(auth -> auth

                                // PUBLIC
                                .requestMatchers("/api/auth/login").permitAll()
                                .requestMatchers("/api/auth/**").permitAll()

                                // SITE ASSIGNMENTS MANAGEMENT
                                .requestMatchers("/api/admin/site-assignments/**")
                                .hasAnyRole("ADMIN", "MANAGER")

                                // SITE MANAGEMENT
                                .requestMatchers("/api/admin/sites/**")
                                .hasAnyRole("ADMIN", "MANAGER")

                                // USER MANAGEMENT
                                .requestMatchers("/api/admin/users/**")
                                .hasAnyRole("ADMIN", "MANAGER")

                                // ADMIN ONLY
                                .requestMatchers("/api/admin/**")
                                .hasRole("ADMIN")

                                // USER
                                .requestMatchers("/api/users/**")
                                .authenticated()

                                // SITE READ
                                .requestMatchers(HttpMethod.GET, "/api/sites/**")
                                .authenticated()

                                // SITE ASSIGNMENTS USER READ
                                .requestMatchers("/api/site-assignments/**")
                                .authenticated()

                                // EVERYTHING ELSE
                                .anyRequest().authenticated()
                )
                .oauth2ResourceServer(oauth2 -> oauth2
                        .bearerTokenResolver(bearerTokenResolver)
                        .jwt(jwt -> jwt.jwtAuthenticationConverter(jwtAuthenticationConverter))
                )
                .build();
    }

    @Bean
    public BearerTokenResolver bearerTokenResolver() {

        DefaultBearerTokenResolver defaultResolver = new DefaultBearerTokenResolver();

        return request -> {

            // 1. First try Authorization header (STANDARD)
            String token = defaultResolver.resolve(request);
            if (token != null) {
                return token;
            }

            // 2. Fallback to cookie (your use case)
            if (request.getCookies() != null) {
                for (Cookie cookie : request.getCookies()) {
                    if ("accessToken".equals(cookie.getName())) {
                        return cookie.getValue();
                    }
                }
            }

            return null;
        };
    }

    @Bean
    public JwtAuthenticationConverter jwtAuthenticationConverter() {

        JwtGrantedAuthoritiesConverter authoritiesConverter =
                new JwtGrantedAuthoritiesConverter();

        authoritiesConverter.setAuthoritiesClaimName("role");
        authoritiesConverter.setAuthorityPrefix("ROLE_");

        JwtAuthenticationConverter converter =
                new JwtAuthenticationConverter();

        converter.setJwtGrantedAuthoritiesConverter(authoritiesConverter);

        return converter;
    }

    @Bean
    public JwtDecoder jwtDecoder(@Value("${jwt.secret}") String secret) {

        SecretKey key = Keys.hmacShaKeyFor(secret.getBytes());

        return NimbusJwtDecoder.withSecretKey(key).build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(
            AuthenticationConfiguration config
    ) throws Exception {
        return config.getAuthenticationManager();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();

        // Frontend dev server
        configuration.setAllowedOrigins(List.of("http://localhost:5173"));

        // Allow cookies / credentials
        configuration.setAllowCredentials(true);

        configuration.setAllowedMethods(List.of(
                "GET",
                "POST",
                "PUT",
                "PATCH",
                "DELETE",
                "OPTIONS"
        ));

        configuration.setAllowedHeaders(List.of(
                "Authorization",
                "Content-Type",
                "Accept"
        ));

        configuration.setExposedHeaders(List.of(
                "Set-Cookie"
        ));

        UrlBasedCorsConfigurationSource source =
                new UrlBasedCorsConfigurationSource();

        source.registerCorsConfiguration("/**", configuration);

        return source;
    }
}
