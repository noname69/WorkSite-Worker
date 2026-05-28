package online.nonamelab.WorkSite_Work.auth.service;

import jakarta.servlet.http.HttpServletResponse;
import online.nonamelab.WorkSite_Work.auth.dto.AuthResponse;
import online.nonamelab.WorkSite_Work.auth.dto.LoginRequest;

public interface AuthService {
    AuthResponse login(LoginRequest request, HttpServletResponse response);
}
