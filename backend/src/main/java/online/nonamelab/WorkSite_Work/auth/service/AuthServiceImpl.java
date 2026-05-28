package online.nonamelab.WorkSite_Work.auth.service;

import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import online.nonamelab.WorkSite_Work.auth.dto.AuthResponse;
import online.nonamelab.WorkSite_Work.auth.dto.LoginRequest;
import online.nonamelab.WorkSite_Work.exception.auth.InvalidCredentialsException;
import online.nonamelab.WorkSite_Work.security.jwt.JwtService;
import online.nonamelab.WorkSite_Work.user.model.User;
import online.nonamelab.WorkSite_Work.user.repository.UserRepository;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;
    private final JwtService jwtService;

    @Override
    public AuthResponse login(LoginRequest request,
                              HttpServletResponse response) {

        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.username(),
                        request.password())
        );

        // 2. Load user from DB
        User user = userRepository.findByUsername(request.username())
                .orElseThrow(InvalidCredentialsException::new);

        user.setLastLoginAt(LocalDateTime.now());
        userRepository.save(user);

        // 3. Generate JWT
        String token = jwtService.generateToken(user);

        // 4. Put JWT into HTTP-only cookie
        ResponseCookie cookie = ResponseCookie.from("accessToken", token)
                .httpOnly(true)
                .secure(false) // set true in production (HTTPS)
                .path("/")
                .maxAge(Duration.ofHours(1))
                .sameSite("Lax")
                .build();

        response.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());

        // 5. Return response body (no sensitive data)
        return new AuthResponse(
                "Login successful",
                user.getId(),
                user.getUsername(),
                user.getRole()
        );
    }
}
