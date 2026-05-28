package com.andres.proyectos.el_telon.firebase.controller;

import com.andres.proyectos.el_telon.firebase.dto.RealtimeWriteRequest;
import com.andres.proyectos.el_telon.firebase.service.FirebaseRealtimeDatabaseService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import com.andres.proyectos.el_telon.seat.service.SeatService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/firebase/realtime")
@RequiredArgsConstructor
public class FirebaseRealtimeController {

    private final FirebaseRealtimeDatabaseService firebaseRealtimeDatabaseService;
    private final SeatService seatService;

    @GetMapping
    public ResponseEntity<Map<String, Object>> getValue(@RequestParam String path) {
        Object value = firebaseRealtimeDatabaseService.getValue(path);
        return ResponseEntity.ok(Map.of(
                "path", path,
                "value", value
        ));
    }

    @PutMapping
    public ResponseEntity<Void> putValue(@RequestParam String path,@Valid @RequestBody RealtimeWriteRequest request) {
        firebaseRealtimeDatabaseService.setValue(path, request.getValue());
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping
    public ResponseEntity<Void> deleteValue(@RequestParam String path) {
        firebaseRealtimeDatabaseService.deleteValue(path);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/reconcile")
    public ResponseEntity<Void> reconcileFunction(@RequestParam Long functionId) {
        seatService.reconcileSnapshot(functionId);
        return ResponseEntity.noContent().build();
    }
}
