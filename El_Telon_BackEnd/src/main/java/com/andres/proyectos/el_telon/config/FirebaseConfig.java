package com.andres.proyectos.el_telon.config;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import com.google.firebase.auth.FirebaseAuth;
import org.springframework.boot.autoconfigure.condition.ConditionalOnBean;
import org.springframework.boot.autoconfigure.condition.ConditionalOnExpression;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.io.FileInputStream;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;

@Configuration
public class FirebaseConfig {

    @Bean
    @ConditionalOnExpression("T(org.springframework.util.StringUtils).hasText('${FIREBASE_SERVICE_ACCOUNT_FILE:}')")
    public FirebaseApp firebaseApp(@Value("${FIREBASE_SERVICE_ACCOUNT_FILE:}") String serviceAccountFile) throws IOException {
        String resolvedServiceAccountFile = resolveServiceAccountFilePath(serviceAccountFile);

        if (!Files.exists(Path.of(resolvedServiceAccountFile))) {
            throw new IOException("FIREBASE_SERVICE_ACCOUNT_FILE=" + resolvedServiceAccountFile + " (No existe el archivo o el directorio)");
        }

        try (FileInputStream serviceAccount = new FileInputStream(resolvedServiceAccountFile)) {
            FirebaseOptions options = FirebaseOptions.builder()
                    .setCredentials(GoogleCredentials.fromStream(serviceAccount))
                    .build();

            if (FirebaseApp.getApps().isEmpty()) {
                return FirebaseApp.initializeApp(options);
            }

            return FirebaseApp.getInstance();
        }
    }

    private String resolveServiceAccountFilePath(String serviceAccountFile) {
        String resolved = serviceAccountFile == null ? "" : serviceAccountFile.trim();

        if (resolved.startsWith("FIREBASE_SERVICE_ACCOUNT_FILE=")) {
            resolved = resolved.substring("FIREBASE_SERVICE_ACCOUNT_FILE=".length()).trim();
        }

        if (resolved.startsWith("\"") && resolved.endsWith("\"") && resolved.length() >= 2) {
            resolved = resolved.substring(1, resolved.length() - 1).trim();
        }

        return resolved;
    }

    @Bean
    @ConditionalOnBean(FirebaseApp.class)
    public FirebaseAuth firebaseAuth(FirebaseApp firebaseApp) {
        return FirebaseAuth.getInstance(firebaseApp);
    }
}