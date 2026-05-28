package online.nonamelab.WorkSite_Work.auth.service;

import jakarta.servlet.http.HttpServletResponse;
import online.nonamelab.WorkSite_Work.auth.dto.AuthResponse;

public interface AuthService {
    AuthResponse login(String username, String password, HttpServletResponse response);
}
