package com.andres.proyectos.el_telon.auth.controller;

import com.andres.proyectos.el_telon.auth.dto.AuthRequest;
import com.andres.proyectos.el_telon.auth.dto.AuthResponse;
import com.andres.proyectos.el_telon.auth.service.AuthService;
import com.andres.proyectos.el_telon.auth.dto.RegisterRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<Void> register(@RequestBody RegisterRequest request){
        authService.register(request);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody AuthRequest request){
        return ResponseEntity.ok(authService.login(request));
    }

    @GetMapping("/admin/dashboard")
    public ResponseEntity<String> adminDashboard(){
        return ResponseEntity.ok("Admin Dashboard");
    }

}
