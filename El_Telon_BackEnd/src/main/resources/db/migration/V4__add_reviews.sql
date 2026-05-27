CREATE TABLE IF NOT EXISTS `resenas` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `id_pelicula` bigint NOT NULL,
  `autor` varchar(120) NOT NULL,
  `comentario` varchar(600) NOT NULL,
  `calificacion` int NOT NULL,
  `fecha_creacion` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `id_pelicula` (`id_pelicula`),
  CONSTRAINT `resenas_ibfk_1` FOREIGN KEY (`id_pelicula`) REFERENCES `peliculas` (`id`) ON DELETE CASCADE,
  CONSTRAINT `resenas_calificacion_check` CHECK (`calificacion` BETWEEN 1 AND 5)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
