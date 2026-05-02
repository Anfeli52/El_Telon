INSERT INTO salas (id, nombre, capacidad_total, tipo_sala) VALUES
(1, 'sala 1', 153, 'NORMAL'),
(2, 'sala 2', 153, 'NORMAL'),
(3, 'sala 3', 153, 'NORMAL')
ON DUPLICATE KEY UPDATE
nombre = VALUES(nombre),
capacidad_total = VALUES(capacidad_total),
tipo_sala = VALUES(tipo_sala);

INSERT INTO asientos (fila, numero, tipo_asiento, id_sala)
SELECT filas.fila, numeros.numero,
CASE
    WHEN filas.fila IN ('G', 'H', 'I') THEN 'VIP'
    WHEN filas.fila = 'C' AND numeros.numero IN (9, 10, 11, 12) THEN 'DISCAPACITADO'
    ELSE 'NORMAL'
END,
salas_base.id
FROM salas salas_base
CROSS JOIN (
    SELECT 'A' fila UNION ALL SELECT 'B' UNION ALL SELECT 'C' UNION ALL SELECT 'D' UNION ALL SELECT 'E' UNION ALL SELECT 'F' UNION ALL SELECT 'G' UNION ALL SELECT 'H' UNION ALL SELECT 'I'
) filas
CROSS JOIN (
    SELECT 1 numero UNION ALL SELECT 2 UNION ALL SELECT 3 UNION ALL SELECT 4 UNION ALL SELECT 5 UNION ALL SELECT 6 UNION ALL SELECT 7 UNION ALL SELECT 8 UNION ALL SELECT 9 UNION ALL SELECT 10 UNION ALL SELECT 11 UNION ALL SELECT 12 UNION ALL SELECT 13 UNION ALL SELECT 14 UNION ALL SELECT 15 UNION ALL SELECT 16 UNION ALL SELECT 17
) numeros
WHERE salas_base.id IN (1, 2, 3)
AND NOT EXISTS (
    SELECT 1 FROM asientos a
    WHERE a.id_sala = salas_base.id
    AND a.fila = filas.fila
    AND a.numero = numeros.numero
);

INSERT INTO funciones (id_pelicula, id_sala, fecha_proyeccion, hora_inicio, precio_base) VALUES
(1, 1, '2026-04-30', '13:10:00', 16000),
(1, 2, '2026-04-30', '18:40:00', 18000),
(2, 3, '2026-04-30', '15:20:00', 17000),
(2, 1, '2026-05-01', '20:30:00', 19000),
(3, 2, '2026-04-30', '16:00:00', 17000),
(3, 3, '2026-05-01', '19:10:00', 18000),
(4, 1, '2026-04-30', '14:30:00', 18000),
(4, 2, '2026-05-01', '21:00:00', 20000),
(5, 3, '2026-04-30', '22:10:00', 17000),
(6, 1, '2026-05-01', '18:20:00', 17000),
(7, 2, '2026-04-30', '12:00:00', 15000),
(8, 3, '2026-05-01', '15:40:00', 16000),
(9, 1, '2026-04-30', '17:30:00', 16000),
(10, 2, '2026-05-01', '19:50:00', 17000);

INSERT INTO usuarios (id, nombre, correo, password, role) VALUES
(999, 'cliente prueba', 'cliente.prueba@telon.com', '$2a$10$prueba', 'USER')
ON DUPLICATE KEY UPDATE
nombre = VALUES(nombre);

INSERT INTO ticketes (id_usuario, id_funcion, id_asiento, precio_final)
SELECT 999, f.id, a.id, f.precio_base
FROM funciones f
JOIN asientos a ON a.id_sala = f.id_sala
WHERE f.id IN (1, 2, 3, 4)
AND a.fila IN ('A', 'C', 'E')
AND a.numero IN (2, 5, 9, 13, 16)
AND NOT EXISTS (
    SELECT 1 FROM ticketes t
    WHERE t.id_funcion = f.id
    AND t.id_asiento = a.id
);
