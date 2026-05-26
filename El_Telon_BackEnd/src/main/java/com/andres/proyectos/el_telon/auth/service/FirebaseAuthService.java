package com.andres.proyectos.el_telon.auth.service;

import com.andres.proyectos.el_telon.auth.dto.AuthResponse;
import com.andres.proyectos.el_telon.auth.dto.FirebaseAuthRequest;
import com.andres.proyectos.el_telon.user.AuthProvider;
import com.andres.proyectos.el_telon.user.Role;
import com.andres.proyectos.el_telon.user.User;
import com.andres.proyectos.el_telon.user.UserRepository;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseAuthException;
import com.google.firebase.auth.FirebaseToken;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.ObjectProvider;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class FirebaseAuthService {

    private final ObjectProvider<FirebaseAuth> firebaseAuthProvider;
    private final UserRepository userRepository;
    private final JwtService jwtService;

    public AuthResponse authenticate(FirebaseAuthRequest request) {
        FirebaseAuth firebaseAuth = firebaseAuthProvider.getIfAvailable();
        if (firebaseAuth == null) {
            throw new ResponseStatusException(HttpStatus.SERVICE_UNAVAILABLE, "Firebase no está configurado en el backend");
        }

        FirebaseToken decodedToken;
        try {
            decodedToken = firebaseAuth.verifyIdToken(request.getIdToken());
        } catch (FirebaseAuthException ex) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Token de Firebase inválido");
        }

        String correo = decodedToken.getEmail();
        if (correo == null || correo.isBlank()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Firebase no devolvió un correo válido");
        }

        String nombre = request.getNombre();
        if (nombre == null || nombre.isBlank()) {
            nombre = decodedToken.getName();
        }
        if (nombre == null || nombre.isBlank()) {
            nombre = correo.split("@")[0];
        }

        final String resolvedNombre = nombre;

        User user = userRepository.findByFirebaseUid(decodedToken.getUid())
                .or(() -> userRepository.findByCorreo(correo))
                .orElseGet(() -> User.builder()
                .nombre(resolvedNombre)
                        .correo(correo)
                        .password(null)
                        .firebaseUid(decodedToken.getUid())
                        .role(Role.USER)
                        .build());

        if (user.getFirebaseUid() == null || user.getFirebaseUid().isBlank()) {
            user.setFirebaseUid(decodedToken.getUid());
        }

        user.setAuthProvider(AuthProvider.FIREBASE);

        if (user.getNombre() == null || user.getNombre().isBlank()) {
            user.setNombre(resolvedNombre);
        }

        userRepository.save(user);

        Map<String, Object> extraClaims = new HashMap<>();
        extraClaims.put("nombre", user.getNombre());
        extraClaims.put("authProvider", user.getAuthProvider().name());

        String jwtToken = jwtService.generateToken(user, extraClaims);
        return AuthResponse.builder().token(jwtToken).role(user.getRole().name()).build();
    }
}