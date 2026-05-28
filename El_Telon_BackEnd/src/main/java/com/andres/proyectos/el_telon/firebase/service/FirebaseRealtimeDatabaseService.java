package com.andres.proyectos.el_telon.firebase.service;

import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.FirebaseDatabase;
import com.google.firebase.database.ValueEventListener;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.ObjectProvider;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;

@Service
@RequiredArgsConstructor
@Slf4j
public class FirebaseRealtimeDatabaseService {

    private final ObjectProvider<FirebaseDatabase> firebaseDatabaseProvider;

    public Object getValue(String path) {
        FirebaseDatabase firebaseDatabase = requireDatabase();
        String normalizedPath = normalizePath(path);
        CompletableFuture<DataSnapshot> snapshotFuture = new CompletableFuture<>();

        ValueEventListener listener = new ValueEventListener() {
            @Override
            public void onDataChange(DataSnapshot snapshot) {
                snapshotFuture.complete(snapshot);
            }

            @Override
            public void onCancelled(DatabaseError error) {
                snapshotFuture.completeExceptionally(error.toException());
            }
        };

        firebaseDatabase.getReference(normalizedPath).addListenerForSingleValueEvent(listener);

        try {
            DataSnapshot snapshot = snapshotFuture.get(8, TimeUnit.SECONDS);
            return snapshot.getValue();
        } catch (InterruptedException ex) {
            Thread.currentThread().interrupt();
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Consulta interrumpida en Firebase Realtime Database");
        } catch (ExecutionException | TimeoutException ex) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "No se pudo leer Firebase Realtime Database");
        }
    }

    public void setValue(String path, Object value) {
        FirebaseDatabase firebaseDatabase = requireDatabase();
        String normalizedPath = normalizePath(path);

        try {
            firebaseDatabase.getReference(normalizedPath)
                    .setValueAsync(value)
                    .get(8, TimeUnit.SECONDS);
        } catch (InterruptedException ex) {
            Thread.currentThread().interrupt();
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Escritura interrumpida en Firebase Realtime Database");
        } catch (ExecutionException | TimeoutException ex) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "No se pudo escribir en Firebase Realtime Database", ex);
        }
    }

    public void deleteValue(String path) {
        FirebaseDatabase firebaseDatabase = requireDatabase();
        String normalizedPath = normalizePath(path);

        try {
            firebaseDatabase.getReference(normalizedPath)
                    .removeValueAsync()
                    .get(8, TimeUnit.SECONDS);
        } catch (InterruptedException ex) {
            Thread.currentThread().interrupt();
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Eliminacion interrumpida en Firebase Realtime Database");
        } catch (ExecutionException | TimeoutException ex) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "No se pudo eliminar en Firebase Realtime Database", ex);
        }
    }

    public void setValueIfAvailable(String path, Object value) {
        FirebaseDatabase firebaseDatabase = firebaseDatabaseProvider.getIfAvailable();
        if (firebaseDatabase == null) {
            return;
        }

        String normalizedPath = normalizePath(path);

        try {
            firebaseDatabase.getReference(normalizedPath)
                    .setValueAsync(value)
                    .get(8, TimeUnit.SECONDS);
        } catch (InterruptedException ex) {
            Thread.currentThread().interrupt();
            log.warn("Escritura interrumpida en Firebase Realtime Database para la ruta {}", normalizedPath, ex);
        } catch (ExecutionException | TimeoutException ex) {
            log.warn("No se pudo escribir en Firebase Realtime Database para la ruta {}", normalizedPath, ex);
        }
    }

    private FirebaseDatabase requireDatabase() {
        FirebaseDatabase firebaseDatabase = firebaseDatabaseProvider.getIfAvailable();
        if (firebaseDatabase == null) {
            throw new ResponseStatusException(HttpStatus.SERVICE_UNAVAILABLE, "Firebase Realtime Database no esta configurado en el backend");
        }
        return firebaseDatabase;
    }

    private String normalizePath(String path) {
        if (path == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "El path es obligatorio");
        }

        String normalized = path.trim();
        if (normalized.startsWith("/")) {
            normalized = normalized.substring(1);
        }
        if (normalized.endsWith("/")) {
            normalized = normalized.substring(0, normalized.length() - 1);
        }

        if (normalized.isBlank()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "El path no puede estar vacio");
        }

        return normalized;
    }
}
