INSERT INTO funciones (id_pelicula, id_sala, fecha_proyeccion, hora_inicio, precio_base)
SELECT data.id_pelicula, data.id_sala, data.fecha_proyeccion, data.hora_inicio, data.precio_base
FROM (
    SELECT 1 id_pelicula, 1 id_sala, DATE '2026-05-01' fecha_proyeccion, TIME '13:10:00' hora_inicio, 16000 precio_base UNION ALL
    SELECT 1, 2, DATE '2026-05-01', TIME '18:40:00', 18000 UNION ALL
    SELECT 1, 3, DATE '2026-05-02', TIME '21:10:00', 19000 UNION ALL
    SELECT 2, 3, DATE '2026-05-01', TIME '15:20:00', 17000 UNION ALL
    SELECT 2, 1, DATE '2026-05-01', TIME '20:30:00', 19000 UNION ALL
    SELECT 2, 2, DATE '2026-05-02', TIME '17:50:00', 18000 UNION ALL
    SELECT 3, 2, DATE '2026-05-01', TIME '16:00:00', 17000 UNION ALL
    SELECT 3, 3, DATE '2026-05-01', TIME '19:10:00', 18000 UNION ALL
    SELECT 3, 1, DATE '2026-05-02', TIME '21:40:00', 19000 UNION ALL
    SELECT 4, 1, DATE '2026-05-01', TIME '14:30:00', 18000 UNION ALL
    SELECT 4, 2, DATE '2026-05-01', TIME '21:00:00', 20000 UNION ALL
    SELECT 4, 3, DATE '2026-05-02', TIME '18:20:00', 19000 UNION ALL
    SELECT 5, 3, DATE '2026-05-01', TIME '18:10:00', 16000 UNION ALL
    SELECT 5, 1, DATE '2026-05-01', TIME '22:10:00', 17000 UNION ALL
    SELECT 5, 2, DATE '2026-05-02', TIME '20:00:00', 17000 UNION ALL
    SELECT 6, 1, DATE '2026-05-01', TIME '17:20:00', 16000 UNION ALL
    SELECT 6, 2, DATE '2026-05-01', TIME '21:30:00', 17000 UNION ALL
    SELECT 6, 3, DATE '2026-05-02', TIME '19:40:00', 17000 UNION ALL
    SELECT 7, 2, DATE '2026-05-01', TIME '12:00:00', 15000 UNION ALL
    SELECT 7, 3, DATE '2026-05-01', TIME '15:10:00', 15000 UNION ALL
    SELECT 7, 1, DATE '2026-05-02', TIME '13:30:00', 15000 UNION ALL
    SELECT 8, 3, DATE '2026-05-01', TIME '14:40:00', 16000 UNION ALL
    SELECT 8, 1, DATE '2026-05-01', TIME '18:20:00', 17000 UNION ALL
    SELECT 8, 2, DATE '2026-05-02', TIME '16:50:00', 16000 UNION ALL
    SELECT 9, 1, DATE '2026-05-01', TIME '16:30:00', 16000 UNION ALL
    SELECT 9, 2, DATE '2026-05-01', TIME '20:10:00', 17000 UNION ALL
    SELECT 9, 3, DATE '2026-05-02', TIME '18:00:00', 17000 UNION ALL
    SELECT 10, 2, DATE '2026-05-01', TIME '15:50:00', 16000 UNION ALL
    SELECT 10, 3, DATE '2026-05-01', TIME '19:50:00', 17000 UNION ALL
    SELECT 10, 1, DATE '2026-05-02', TIME '21:20:00', 18000
) data
WHERE NOT EXISTS (
    SELECT 1 FROM funciones f
    WHERE f.id_pelicula = data.id_pelicula
    AND f.id_sala = data.id_sala
    AND f.fecha_proyeccion = data.fecha_proyeccion
    AND f.hora_inicio = data.hora_inicio
);

INSERT INTO ticketes (id_usuario, id_funcion, id_asiento, precio_final)
SELECT 999, f.id, a.id, f.precio_base
FROM funciones f
JOIN asientos a ON a.id_sala = f.id_sala
WHERE f.id_pelicula IN (1, 2, 3, 4, 5, 6, 7, 8, 9, 10)
AND a.fila IN ('A', 'C', 'E')
AND a.numero IN (2, 5, 13, 16)
AND NOT EXISTS (
    SELECT 1 FROM ticketes t
    WHERE t.id_funcion = f.id
    AND t.id_asiento = a.id
);
