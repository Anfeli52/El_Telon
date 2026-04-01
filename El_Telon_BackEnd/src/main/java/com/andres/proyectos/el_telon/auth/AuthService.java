package com.andres.proyectos.el_telon.auth;

import com.andres.proyectos.el_telon.user.Role;
import com.andres.proyectos.el_telon.user.User;
import com.andres.proyectos.el_telon.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public String register(RegisterRequest request){
        User user = new User();
        user.setNombre(request.getNombre());
        user.setCorreo(request.getCorreo());
        user.setRole(Role.USER);

        user.setPassword(passwordEncoder.encode(request.getPassword()));

        userRepository.save(user);
        return jwtService.generateToken(user);
    }

    public AuthResponse login(AuthRequest request){
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getCorreo(),
                        request.getPassword()
                )
        );

        var user = userRepository.findByCorreo(request.getCorreo())
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        var jwtToken = jwtService.generateToken(user);

        return AuthResponse.builder().token(jwtToken).role(user.getRole().name()).build();
    }
}
