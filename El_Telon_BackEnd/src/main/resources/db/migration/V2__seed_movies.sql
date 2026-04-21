ALTER TABLE peliculas
ADD COLUMN categoria VARCHAR(100) NOT NULL DEFAULT 'General',
ADD COLUMN activo TINYINT(1) NOT NULL DEFAULT 1;

INSERT INTO peliculas (nombre, descripcion, imagen_url, categoria, fecha_estreno, duracion, activo) VALUES
('Avengers: Endgame', 'Los Avengers enfrentan su batalla final.', 'https://image.tmdb.org/t/p/w500/or06FN3Dka5tukK1e9sl16pB3iy.jpg', 'Accion', '2019-04-26', 181, 1),
('John Wick 4', 'John Wick regresa en una nueva mision.', 'https://image.tmdb.org/t/p/w500/vZloFAK7NmvMGKE7VkF5UHaz0I.jpg', 'Accion', '2023-03-24', 169, 1),
('Interstellar', 'Un viaje espacial para salvar a la humanidad.', 'https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg', 'Ciencia Ficcion', '2014-11-07', 169, 1),
('Dune: Part Two', 'Paul Atreides continua su destino en Arrakis.', 'https://image.tmdb.org/t/p/w500/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg', 'Ciencia Ficcion', '2024-03-01', 166, 1),
('The Conjuring', 'Investigadores paranormales enfrentan una presencia oscura.', 'https://image.tmdb.org/t/p/w500/wVYREutTvI2tmxr6ujrHT704wGF.jpg', 'Terror', '2013-07-19', 112, 1),
('Smile', 'Una fuerza aterradora comienza a perseguir a una doctora.', 'https://image.tmdb.org/t/p/w500/aPqcQwu4VGEewPhagWNncDbJ9Xp.jpg', 'Terror', '2022-09-30', 115, 1),
('Toy Story 4', 'Woody y sus amigos viven una nueva aventura.', 'https://image.tmdb.org/t/p/w500/w9kR8qbmQ01HwnvK4alvnQ2ca0L.jpg', 'Animacion', '2019-06-21', 100, 1),
('Spider-Man: Into the Spider-Verse', 'Miles Morales descubre el multiverso arana.', 'https://image.tmdb.org/t/p/w500/iiZZdoQBEYBv6id8su7ImL0oCbD.jpg', 'Animacion', '2018-12-14', 117, 1),
('Titanic', 'Una historia de amor durante una tragedia maritima.', 'https://image.tmdb.org/t/p/w500/9xjZS2rlVxm8SFx8kPC3aIGCOYQ.jpg', 'Romance', '1997-12-19', 194, 1),
('La La Land', 'Dos artistas luchan por sus suenos y su amor.', 'https://image.tmdb.org/t/p/w500/uDO8zWDhfWwoFdKS4fzkUJt0Rf0.jpg', 'Romance', '2016-12-09', 128, 1);
