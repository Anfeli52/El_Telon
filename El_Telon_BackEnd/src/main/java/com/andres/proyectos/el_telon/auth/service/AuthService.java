package com.andres.proyectos.el_telon.auth.service;

import com.andres.proyectos.el_telon.auth.dto.AuthRequest;
import com.andres.proyectos.el_telon.auth.dto.AuthResponse;
import com.andres.proyectos.el_telon.auth.dto.RegisterRequest;
import com.andres.proyectos.el_telon.user.Role;
import com.andres.proyectos.el_telon.user.User;
import com.andres.proyectos.el_telon.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.HashMap;
import java.util.Map;


@Service
@RequiredArgsConstructor
public class AuthService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public void register(RegisterRequest request) {

        if(!request.getCorreo().contains("@") || !request.getCorreo().contains(".") || request.getCorreo().isEmpty()){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Datos inválidos, correo vacío o formato incorrecto");
        }
        if(userRepository.findByCorreo(request.getCorreo()).isPresent()){
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Correo ya registrado");
        }
        if(request.getPassword().length() < 8){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "La contraseña debe tener al menos 8 caracteres");
        }
        var user = User.builder()
                .nombre(request.getNombre())
                .correo(request.getCorreo())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(Role.USER)
                .build();

        userRepository.save(user);
    }

    public AuthResponse login(AuthRequest request) {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            request.getCorreo(),
                            request.getPassword()
                    )
            );

            var user = userRepository.findByCorreo(request.getCorreo()).orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Credenciales inválidas"));
            Map<String, Object> extraClaims = new HashMap<>();
            extraClaims.put("nombre", user.getNombre());

            String jwtToken = jwtService.generateToken(user, extraClaims);

            return AuthResponse.builder().token(jwtToken).role(user.getRole().name()).build();
        } catch (BadCredentialsException ex) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Credenciales inválidas");
        }
    }
}
