package lk.autohive.autohive_backend.service;

import lk.autohive.autohive_backend.model.dto.AuthResponse;
import lk.autohive.autohive_backend.model.dto.LoginRequest;
import lk.autohive.autohive_backend.model.dto.RegisterRequest;

public interface AuthService {
    AuthResponse register(RegisterRequest request);
    AuthResponse login(LoginRequest request);
}
