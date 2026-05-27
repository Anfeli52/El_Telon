-- ========================================================
-- SCRIPT DE MIGRACIÓN FLYWAY UNIFICADO
-- ========================================================

SET @num1 := 0, @num2 := 0, @num3 := 0, @num4 := 0;

INSERT INTO salas (nombre, capacidad_total, tipo_sala)
VALUES
-- Salas Normales (Mayor capacidad)
('Sala 1 - General', 150, 'NORMAL'),
('Sala 2 - General', 150, 'NORMAL'),

-- Salas 3D
('Sala 3 - RealD 3D', 120, '3D'),
('Sala 4 - RealD 3D', 120, '3D'),

-- Salas IMAX (Pantallas gigantes, gran capacidad)
('Sala 5 - IMAX Experience', 300, 'IMAX'),
('Sala 6 - IMAX Laser', 280, 'IMAX'),

-- Salas VIP (Menos asientos, más confort)
('Sala 7 - VIP Platinum', 40, 'VIP'),
('Sala 8 - VIP Gold', 40, 'VIP');

-- Asientos VIP (Salas 7 y 8)
INSERT INTO asientos (fila, numero, tipo_asiento, id_sala)
SELECT
    f.fila,
    n.numero,
    'VIP' AS tipo_asiento,
    s.id AS id_sala
FROM
    (SELECT 'A' AS fila UNION SELECT 'B' UNION SELECT 'C' UNION SELECT 'D') f
        CROSS JOIN
    (SELECT 1 AS numero UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION SELECT 5
     UNION SELECT 6 UNION SELECT 7 UNION SELECT 8 UNION SELECT 9 UNION SELECT 10) n
        CROSS JOIN
    (SELECT id FROM salas WHERE id IN (7, 8)) s;

-- Asientos 3D (Salas 3 y 4)
INSERT INTO asientos (fila, numero, tipo_asiento, id_sala)
SELECT
    f.fila,
    n.numero,
    IF(f.fila = 'H' AND n.numero IN (1, 2, 14, 15), 'DISCAPACITADO', 'NORMAL') AS tipo_asiento,
    s.id AS id_sala
FROM
    (SELECT 'A' AS fila UNION SELECT 'B' UNION SELECT 'C' UNION SELECT 'D'
     UNION SELECT 'E' UNION SELECT 'F' UNION SELECT 'G' UNION SELECT 'H') f
        CROSS JOIN
    (SELECT 1 AS numero UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION SELECT 5
     UNION SELECT 6 UNION SELECT 7 UNION SELECT 8 UNION SELECT 9 UNION SELECT 10
     UNION SELECT 11 UNION SELECT 12 UNION SELECT 13 UNION SELECT 14 UNION SELECT 15) n
        CROSS JOIN
    (SELECT id FROM salas WHERE id IN (3, 4)) s;

-- Asientos Normales (Salas 1 y 2)
INSERT INTO asientos (fila, numero, tipo_asiento, id_sala)
SELECT
    f.fila,
    n.numero,
    'NORMAL' AS tipo_asiento,
    s.id AS id_sala
FROM
    (SELECT 'A' AS fila UNION SELECT 'B' UNION SELECT 'C' UNION SELECT 'D' UNION SELECT 'E'
     UNION SELECT 'F' UNION SELECT 'G' UNION SELECT 'H' UNION SELECT 'I' UNION SELECT 'J') f
        CROSS JOIN
    (SELECT 1 AS numero UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION SELECT 5
     UNION SELECT 6 UNION SELECT 7 UNION SELECT 8 UNION SELECT 9 UNION SELECT 10
     UNION SELECT 11 UNION SELECT 12 UNION SELECT 13 UNION SELECT 14 UNION SELECT 15) n
        CROSS JOIN
    (SELECT id FROM salas WHERE id IN (1, 2)) s;

-- Asientos IMAX (Salas 5 y 6)
INSERT INTO asientos (fila, numero, tipo_asiento, id_sala)
SELECT
    f.fila,
    n.numero,
    IF(f.fila IN ('M', 'N'), 'VIP', 'NORMAL') AS tipo_asiento,
    s.id AS id_sala
FROM
    (SELECT 'A' AS fila UNION SELECT 'B' UNION SELECT 'C' UNION SELECT 'D' UNION SELECT 'E'
     UNION SELECT 'F' UNION SELECT 'G' UNION SELECT 'H' UNION SELECT 'I' UNION SELECT 'J'
     UNION SELECT 'K' UNION SELECT 'L' UNION SELECT 'M' UNION SELECT 'N') f
        CROSS JOIN
    (SELECT 1 AS numero UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION SELECT 5
     UNION SELECT 6 UNION SELECT 7 UNION SELECT 8 UNION SELECT 9 UNION SELECT 10
     UNION SELECT 11 UNION SELECT 12 UNION SELECT 13 UNION SELECT 14 UNION SELECT 15
     UNION SELECT 16 UNION SELECT 17 UNION SELECT 18 UNION SELECT 19 UNION SELECT 20) n
        CROSS JOIN
    (SELECT id FROM salas WHERE id IN (5, 6)) s;


SELECT * FROM ticketes;


INSERT INTO peliculas (nombre, descripcion, imagen_url, fecha_estreno, duracion, categoria, activo)
VALUES
-- ========================================================
-- CIENCIA_FICCION
-- ========================================================
('Star Wars: Episodio I - La Amenaza Fantasma', 'Los Jedi descubren a Anakin Skywalker, un niño inusualmente fuerte en la Fuerza.', 'https://imgs.search.brave.com/JMzK5DDLDRMMVFJL7F5bz-PihFQ0zRgQFpAPqExPDDw/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/Y2luZW1hc2NvbWlj/cy5jb20vd3AtY29u/dGVudC91cGxvYWRz/LzIwMjUvMDMvU3Rh/ci1XYXJzLUVwaXNv/ZGlvLUktTGEtQW1l/bmF6YS1GYW50YXNt/YS5qcGc', '1999-05-19', 138, 'CIENCIA_FICCION', 1),
('Star Wars: Episodio II - El Ataque de los Clones', 'Anakin Skywalker debe elegir entre su deber como Jedi y su amor prohibido, mientras la galaxia se encamina hacia una guerra masiva.', 'https://imgs.search.brave.com/8P1kIjMWySw6E0THygWJHemdpMMM8FZBhgMq-GkQKpI/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL00v/TVY1Qk5UZ3hNalky/WXpVdFptVm1OQzAw/WWpBd0xXSmxPRE10/TkRCaE56bGxOekl6/TWpneFhrRXlYa0Zx/Y0djQC5qcGc', '2002-05-16', 140, 'CIENCIA_FICCION', 1),
('Star Wars: Episodio III - La Venganza de los Sith', 'Tentado por las promesas de poder supremo, Anakin Skywalker se entrega al Lado Oscuro de la Fuerza, convirtiéndose en Darth Vader.', 'https://i.redd.it/keaxfxiu5ble1.jpeg', '2005-05-19', 140, 'CIENCIA_FICCION', 1),
('Interstellar', 'Un grupo de científicos y pilotos viaja a través de un agujero de gusano en el espacio para encontrar un nuevo hogar para la humanidad.', 'https://m.media-amazon.com/images/M/MV5BYzdjMDAxZGItMjI2My00ODA1LTlkNzItOWFjMDU5ZDJlYWY3XkEyXkFqcGc@._V1_.jpg', '2014-10-26', 169, 'CIENCIA_FICCION', 1),
('Valerian y la Ciudad de los mil planetas', 'Dos agentes espaciales viajan por el universo protegiendo Alpha, una metrópolis en constante expansión habitada por miles de especies.', 'https://m.media-amazon.com/images/M/MV5BMTkxMDAxNDUyNV5BMl5BanBnXkFtZTgwOTc3MzcxMjI@._V1_.jpg', '2017-07-20', 137, 'CIENCIA_FICCION', 1),
('Matrix', 'Cuando un bello extraño lleva al hacker Neo a un inframundo prohibitivo, descubre la impactante verdad: la vida que conoce es un engaño.', 'https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_.jpg', '1999-03-31', 136, 'CIENCIA_FICCION', 1),
('Blade Runner 2049', 'Un nuevo blade runner descubre un secreto largamente oculto que podría sumergir lo que queda de la sociedad en el caos.', 'https://m.media-amazon.com/images/M/MV5BNzA1Njg4NzYxOV5BMl5BanBnXkFtZTgwODk5NjU3MzI@._V1_.jpg', '2017-10-06', 164, 'CIENCIA_FICCION', 1),
('Duna: Parte Dos', 'Paul Atreides se une a Chani y a los Fremen mientras busca venganza contra los conspiradores que destruyeron a su familia.', 'https://m.media-amazon.com/images/M/MV5BNDUzNjRhMjEtOTNiNS00NDk0LTk1ZDgtN2MzM2MwZmJlOGEzXkEyXkFqcGc@._V1_.jpg', '2024-03-01', 166, 'CIENCIA_FICCION', 1),
('El Origen', 'Un ladrón que roba secretos corporativos a través del uso de la tecnología de compartir sueños recibe la tarea inversa de plantar una idea.', 'https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_.jpg', '2010-07-16', 148, 'CIENCIA_FICCION', 1),
('Avatar', 'Un marino parapléjico enviado a la luna Pandora en una misión única se desgarra entre seguir sus órdenes y proteger el mundo que siente como su hogar.', 'https://m.media-amazon.com/images/M/MV5BMDEzMmQwZjctZWU2My00MWNlLWE0NjItMDJlYTRlNGJiZjcyXkEyXkFqcGc@._V1_.jpg', '2009-12-18', 162, 'CIENCIA_FICCION', 1),

-- ========================================================
-- COMEDIA
-- ========================================================
('La Máscara', 'Un tímido empleado de banco adquiere poderes mágicos que alteran por completo su realidad tras ponerse una misteriosa máscara antigua.', 'https://m.media-amazon.com/images/M/MV5BYmNjNjFjNWItNDgxMC00OTMzLWIzZDEtYmIxZDJmNDhiNGFlXkEyXkFqcGc@._V1_.jpg', '1994-07-29', 101, 'COMEDIA', 1),
('El Lobo de Wall Street', 'La vida de excesos, ambición y corrupción del corredor de bolsa neoyorquino Jordan Belfort en la década de los noventa.', 'https://m.media-amazon.com/images/M/MV5BY2Y2YmM1NmUtY2M2YS00Mjg1LWI0MDAtYzhlNzUyMjdjZGZjXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg', '2014-01-24', 180, 'COMEDIA', 1),
('¿Qué pasó ayer?', 'Tres amigos se despiertan después de una despedida de soltero en Las Vegas sin recordar nada y con el novio desaparecido.', 'https://m.media-amazon.com/images/M/MV5BOWY0YzE1OTYtOTZkZC00YTVhLTkwZjQtYTQwNmExNmUxYTU4XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg', '2009-06-05', 100, 'COMEDIA', 1),
('Supercool', 'Dos amigos de la escuela secundaria dependientes sobrellevan la ansiedad por la separación mientras planean una fiesta.', 'https://static.wikia.nocookie.net/doblaje/images/6/68/Superbad2_large.jpg/revision/latest?cb=20211220092710&path-prefix=es', '2007-08-17', 113, 'COMEDIA', 1),
('Son Como Niños', 'Cinco amigos y excompañeros de equipo de baloncesto se reúnen años después junto a sus familias para honrar el fallecimiento de su entrenador de la infancia.', 'https://m.media-amazon.com/images/M/MV5BMDJmYWI5NDctZjM5Zi00NzJiLTk4YTEtZjFhYTZhMTJiYWEzXkEyXkFqcGc@._V1_.jpg', '2010-06-25', 102, 'COMEDIA', 1),
('Una Loca Película de Miedo', 'Un grupo de adolescentes descerebrados es acechado por un asesino en serie familiar tras un trágico accidente automovilístico.', 'https://m.media-amazon.com/images/M/MV5BZGRmMGRhOWMtOTk3Ni00OTRjLTkyYTAtYzA1M2IzMGE3NGRkXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg', '2000-07-07', 88, 'COMEDIA', 1),
('Y Dónde Están las Rubias', 'Dos agentes del FBI caídos en desgracia se hacen pasar por dos herederas de la alta sociedad para investigar una serie de secuestros.', 'https://m.media-amazon.com/images/M/MV5BODFiMTEyY2MtOTVjOS00MTBkLWJmMWEtYjM0Njk5YjVmOGY1XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg', '2004-06-23', 109, 'COMEDIA', 1),
('Tonto y Retonto', 'Dos amigos de buen corazón pero increíblemente estúpidos viajan a través del país para devolver un maletín lleno de dinero a su dueña.', 'https://m.media-amazon.com/images/M/MV5BNGQxZDA1MmMtYWQ1Ni00NTJmLTljMjgtZWVmODllODVhMzgyXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg', '1994-12-16', 107, 'COMEDIA', 1),
('Proyecto X', 'Tres estudiantes de último año de preparatoria organizan una fiesta de cumpleaños para darse a conocer, pero la situación se sale de control rápidamente.', 'https://m.media-amazon.com/images/M/MV5BZTZiMTkyMjItYWZjMC00YTdkLWI2YjMtYThiOWU1YWUzZmQyXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg', '2012-03-02', 88, 'COMEDIA', 1),
('La Propuesta', 'Una poderosa editora se enfrenta a la deportación a Canadá y obliga a su desinteresado asistente a casarse con ella para mantener su estatus.', 'https://m.media-amazon.com/images/M/MV5BYWU3ZmFhYTktNzU4NS00ZTEyLTkwNTYtMWE1M2JjMTFmODVkXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg', '2009-06-19', 108, 'COMEDIA', 1),

-- ========================================================
-- SUSPENSO
-- ========================================================
('Oppenheimer', 'La historia del físico teórico J. Robert Oppenheimer y su rol fundamental en el desarrollo de las primeras armas nucleares de la historia.', 'https://m.media-amazon.com/images/M/MV5BNTFlZDI1YWQtMTVjNy00YWU1LTg2YjktMTlhYmRiYzQ3NTVhXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg', '2023-07-21', 180, 'SUSPENSO', 1),
('La Isla Siniestra', 'En 1954, un alguacil de los EE. UU. investiga la desaparición de un asesino que se escapó de un hospital psiquiátrico en una isla remota.', 'https://m.media-amazon.com/images/M/MV5BMGQyNDA2MzEtOWJkNy00M2U1LTgyMjctMjI0YzZjMTI1OTk3XkEyXkFqcGc@._V1_.jpg', '2010-02-19', 138, 'SUSPENSO', 1),
('Se7en', 'Dos detectives, un novato y un veterano, cazan a un asesino en serie que utiliza los siete pecados capitales como sus motivos.', 'https://m.media-amazon.com/images/M/MV5BY2IzNzMxZjctZjUxZi00YzAxLTk3ZjMtODFjODdhMDU5NDM1XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg', '1995-09-22', 127, 'SUSPENSO', 1),
('Parásitos', 'La codicia y la discriminación de clase amenazan la recién formada relación simbiótica entre la acaudalada familia Park y el clan Kim.', 'https://m.media-amazon.com/images/M/MV5BOTM3ZGI3MzMtYjFhYi00MTY5LTliMmMtNWZlZjI3ZDY5MjZmXkEyXkFqcGc@._V1_.jpg', '2019-05-30', 132, 'SUSPENSO', 1),
('El Silencio de los Inocentes', 'Una joven cadete del FBI debe recibir la ayuda de un asesino caníbal encarcelado y manipulador para atrapar a otro asesino en serie.', 'https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_.jpg', '1991-02-14', 118, 'SUSPENSO', 1),
('Perdida', 'Con la desaparición de su esposa convertida en un circo mediático, un hombre ve cómo el foco de atención se centra en él como sospechoso.', 'https://m.media-amazon.com/images/M/MV5BMTk0MDQ3MzAzOV5BMl5BanBnXkFtZTgwNzU1NzE3MjE@._V1_.jpg', '2014-10-03', 149, 'SUSPENSO', 1),
('Zodiaco', 'Entre 1968 y 1983, un caricaturista de San Francisco se convierte en un detective aficionado obsesionado con rastrear al Asesino del Zodiaco.', 'https://m.media-amazon.com/images/M/MV5BNDFkMTRkZmQtM2I0NC00NjJjLWJlMDctNTNiZWYxYzhjZDZiXkEyXkFqcGc@._V1_.jpg', '2007-03-02', 157, 'SUSPENSO', 1),
('La Chica del Dragón Tatuado', 'Un periodista financiero y una hacker informática investigan conjuntamente la misteriosa desaparición de una mujer ocurrida cuarenta años atrás.', 'https://m.media-amazon.com/images/M/MV5BMTczNDk4NTQ0OV5BMl5BanBnXkFtZTcwNDAxMDgxNw@@._V1_.jpg', '2011-12-21', 158, 'SUSPENSO', 1),
('Un Lugar en Silencio', 'Una familia lucha por sobrevivir en un mundo postapocalíptico invadido por criaturas ciegas con un oído ultra sensible que cazan al menor ruido.', 'https://m.media-amazon.com/images/M/MV5BMjI0MDMzNTQ0M15BMl5BanBnXkFtZTgwMTM5NzM3NDM@._V1_.jpg', '2018-04-06', 90, 'SUSPENSO', 1),
('Prisioneros', 'Cuando la policía tarda en encontrar a su hija secuestrada y a su amiga, un padre desesperado toma el asunto en sus propias manos.', 'https://m.media-amazon.com/images/M/MV5BMTg0NTIzMjQ1NV5BMl5BanBnXkFtZTcwNDc3MzM5OQ@@._V1_FMjpg_UX1000_.jpg', '2013-09-20', 153, 'SUSPENSO', 1),

-- ========================================================
-- ROMANCE
-- ========================================================
('A Silent Voice', 'Un joven intenta enmendar sus errores del pasado buscando la redención con una antigua compañera de clases sorda a la que acosaba en la infancia.', 'https://m.media-amazon.com/images/M/MV5BOTFiNzRiOWEtYTQwNy00NmRiLWE0ZWYtNTE0YjExZjFmZjkwXkEyXkFqcGc@._V1_.jpg', '2016-09-17', 129, 'ROMANCE', 1),
('Diario de una Pasión', 'Un hombre pobre pero apasionado se enamora de una joven rica, dándole un sentido de libertad, pero pronto son separados debido a sus clases sociales.', 'https://m.media-amazon.com/images/M/MV5BM2RiMzcxYmYtNzQ3MC00NTQ4LWE0ZjktNGUwODI1MzhjNDNkXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg', '2004-06-25', 123, 'ROMANCE', 1),
('La La Land', 'Mientras navegan por sus carreras en Los Ángeles, un pianista de jazz y una aspirante a actriz se enamoran mientras intentan reconciliar sus metas.', 'https://m.media-amazon.com/images/M/MV5BMzUzNDM2NzM2MV5BMl5BanBnXkFtZTgwNTM3NTg4OTE@._V1_.jpg', '2016-12-09', 128, 'ROMANCE', 1),
('Cuestión de Tiempo', 'A la edad de 21 años, un joven descubre que los hombres de su familia tienen la capacidad secreta de viajar en el tiempo dentro de sus propias vidas.', 'https://m.media-amazon.com/images/M/MV5BYzlhZjc2NTYtMTUxYS00ZWIzLWIwOWEtYmNhZWM1MGQ3MjczXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg', '2013-09-04', 123, 'ROMANCE', 1),
('500 Días con Ella', 'Un registro no lineal de los días en que un escritor de tarjetas de felicitación se enamora perdidamente de una mujer que no cree en el amor verdadero.', 'https://m.media-amazon.com/images/M/MV5BMTk5MjM4OTU1OV5BMl5BanBnXkFtZTcwODkzNDIzMw@@._V1_.jpg', '2009-08-07', 95, 'ROMANCE', 1),
('Yo Antes de Ti', 'Una chica alegre de un pueblo pequeño encuentra trabajo cuidando a un hombre adinerado de la alta sociedad que quedó paralítico tras un accidente.', 'https://m.media-amazon.com/images/M/MV5BZjU3NmJmYWItMDVhZC00NmM2LWI3YzEtYTg4MzA0YWZiYTQ2XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg', '2016-06-03', 110, 'ROMANCE', 1),
('Bajo la Misma Estrella', 'Dos adolescentes con diagnósticos de cáncer se conocen en un grupo de apoyo mutuo y comienzan una aventura agridulce que les cambia la vida.', 'https://m.media-amazon.com/images/M/MV5BMjA4NzkxNzc5Ml5BMl5BanBnXkFtZTgwNzQ3OTMxMTE@._V1_.jpg', '2014-06-06', 126, 'ROMANCE', 1),
('Orgullo y Prejuicio', 'Las chispas vuelan cuando la animada Elizabeth Bennet conoce al rico y orgulloso Sr. Darcy, desafiando las convenciones de la Inglaterra georgiana.', 'https://m.media-amazon.com/images/M/MV5BZjBlODgwZWEtODcxMi00OTY5LWEyOTItODE2MDBjZjU0ZDU3XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg', '2005-11-23', 129, 'ROMANCE', 1),
('Antes del Amanecer', 'Un joven estadounidense y una estudiante francesa se conocen por casualidad en un tren y deciden pasar una única e inolvidable noche juntos en Viena.', 'https://m.media-amazon.com/images/M/MV5BMTIxMmRiMTAtMzY2ZC00Njg2LWEwMzAtMzVmOTgwZTZiNzZkXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg', '1995-01-27', 101, 'ROMANCE', 1),
('Titanic', 'Una aristócrata de diecisiete años se enamora de un artista amable pero pobre a bordo del lujoso e desafortunado transatlántico RMS Titanic.', 'https://m.media-amazon.com/images/M/MV5BYzYyN2FiZmUtYWYzMy00MzViLWJkZTMtOGY1ZjgzNWMwN2YxXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg', '1997-12-19', 194, 'ROMANCE', 1),

-- ========================================================
-- ANIMACION
-- ========================================================
('Kimetsu No Yaiba - La Fortaleza Infinita', 'Tanjiro y sus aliados se infiltran en los dominios de Muzan Kibutsuji para desatar la batalla definitiva que decidirá el destino de los cazadores.', 'https://m.media-amazon.com/images/M/MV5BN2UzOWNmMTctN2MzOC00MTY3LTlhYWUtZmQzNWM2MTkzZGFmXkEyXkFqcGc@._V1_.jpg', '2025-07-18', 155, 'ANIMACION', 1),
('Spider-Man: Un nuevo universo', 'El adolescente Miles Morales se convierte en el Spider-Man de su universo y debe unirse a cinco individuos con poderes de otras dimensiones.', 'https://m.media-amazon.com/images/M/MV5BMjMwNDkxMTgzOF5BMl5BanBnXkFtZTgwNTkwNTQ3NjM@._V1_.jpg', '2018-12-14', 117, 'ANIMACION', 1),
('Shrek', 'Un ogro antisocial acepta rescatar a una princesa para recuperar su ciénaga de las manos de un lord despiadado.', 'https://static.wikia.nocookie.net/doblaje/images/6/69/Shrekban.png/revision/latest?cb=20200731225428&path-prefix=es', '2001-05-18', 90, 'ANIMACION', 1),
('El Viaje de Chihiro', 'Una niña de 10 años de edad deambula por error en un mundo gobernado por dioses, brujas y espíritus, donde los humanos se transforman en bestias.', 'https://m.media-amazon.com/images/M/MV5BM2E2YzcwMTQtNWRlMC00ZGZlLWJhZTEtMDU4ZGIzMWI0NzJmXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg', '2001-07-20', 125, 'ANIMACION', 1),
('Coco', 'Un aspirante a músico llamado Miguel se enfrenta al rechazo ancestral de su familia por la música y es transportado mágicamente a la Tierra de los Muertos.', 'https://m.media-amazon.com/images/M/MV5BMWQ1NWZjMmQtMTFjOC00NDE2LWFmZTctNzI5MDQwNDU0M2IzXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg', '2017-10-27', 105, 'ANIMACION', 1),
('Mi Villano Favorito', 'Un supervillano criminal adopta a tres niñas huérfanas como peones para un gran plan maligno, sin esperar que el amor de ellas lo cambie.', 'https://m.media-amazon.com/images/M/MV5BMTY3NjY0MTQ0Nl5BMl5BanBnXkFtZTcwMzQ2MTc0Mw@@._V1_.jpg', '2010-07-09', 95, 'ANIMACION', 1),
('Toy Story 3', 'Mientras Andy se prepara para ir a la universidad, Woody, Buzz Lightyear y el resto de sus fieles juguetes terminan accidentalmente en una guardería.', 'https://m.media-amazon.com/images/M/MV5BMTgxOTY4Mjc0MF5BMl5BanBnXkFtZTcwNTA4MDQyMw@@._V1_FMjpg_UX1000_.jpg', '2010-06-18', 103, 'ANIMACION', 1),
('Intensa-Mente 2', 'Riley entra en la adolescencia y su cuartel general mental experimenta una demolición repentina para dejar espacio a nuevas emociones.', 'https://m.media-amazon.com/images/M/MV5BYWY3MDE2Y2UtOTE3Zi00MGUzLTg2MTItZjE1ZWVkMGVlODRmXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg', '2024-06-14', 96, 'ANIMACION', 1),
('Cómo Entrenar a tu Dragón', 'Un desafortunado joven vikingo que aspira a cazar dragones se convierte inesperadamente en el amigo improbable de un joven dragón Furia Nocturna.', 'https://m.media-amazon.com/images/M/MV5BMjA5NDQyMjc2NF5BMl5BanBnXkFtZTcwMjg5ODcyMw@@._V1_.jpg', '2010-03-26', 98, 'ANIMACION', 1),
('Rey León', 'Un joven cachorro de león debe huir de su reino tras el asesinato de su padre, solo para aprender el verdadero significado de la responsabilidad y el destino.', 'https://m.media-amazon.com/images/M/MV5BOTk0YjM0YmMtZTNiOC00ZjU5LWEzNmUtNTRiYzAxMTg0MzVkXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg', '1994-06-24', 88, 'ANIMACION', 1),

-- ========================================================
-- ACCION
-- ========================================================
('John Wick', 'Un exasesino a sueldo sale del retiro para vengarse de los gángsters que le quitaron todo.', 'https://m.media-amazon.com/images/M/MV5BMTU2NjA1ODgzMF5BMl5BanBnXkFtZTgwMTM2MTI4MjE@._V1_.jpg', '2014-10-24', 101, 'ACCION', 1),
('Gladiador', 'Un general romano traicionado regresa a Roma como gladiador para buscar venganza contra el emperador.', 'https://m.media-amazon.com/images/M/MV5BYWJjYWJhZmMtOGM1My00YWQzLWFlNWEtZTQ3ZjM5NzAxZDNkXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg', '2000-05-05', 155, 'ACCION', 1),
('Mad Max: Furia en el Camino', 'En un desierto postapocalíptico, una mujer se rebela contra un gobernante tiránico en busca de su hogar con la ayuda de un vagabundo llamado Max.', 'https://m.media-amazon.com/images/M/MV5BODE2NWUwYmYtYmNmZi00OTVjLTgxMzEtZWYyMWVmODg5MmM2XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg', '2015-05-15', 120, 'ACCION', 1),
('Batman: El Caballero de la Noche', 'Cuando la amenaza conocida como el Guasón causa estragos y caos en Gotham, Batman debe aceptar una de las mayores pruebas psicológicas de su vida.', 'https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_.jpg', '2008-07-18', 152, 'ACCION', 1),
('Top Gun: Maverick', 'Después de treinta años de servicio, un piloto de la Marina de élite debe entrenar a un destacamento de graduados para una misión especializada.', 'https://m.media-amazon.com/images/M/MV5BNDI2MDYxMzgtYjU3OS00MTBjLTk5OTUtNzc2NzI3MTI3NTFjXkEyXkFqcGc@._V1_.jpg', '2022-05-27', 130, 'ACCION', 1),
('Misión Imposible: Sentencia Mortal - Parte 1', 'Ethan Hunt y su equipo de la FMI deben rastrear una nueva y aterradora arma informática que amenaza a toda la humanidad si cae en las manos equivocadas.', 'https://m.media-amazon.com/images/M/MV5BZTg0YzRkNDMtZTJjZS00Mjk0LTgwNGQtZWIzMTM3ZDRmZTQwXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg', '2023-07-12', 163, 'ACCION', 1),
('Búsqueda Implacable', 'Un exagente del gobierno viaja por Europa y utiliza sus antiguas habilidades tácticas para rescatar a su hija distanciada que fue secuestrada en París.', 'https://m.media-amazon.com/images/M/MV5BNzgwN2YzNjEtZjA2ZC00YTE1LWI4ZjEtZmFlNGU5MmIxNzFjXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg', '2009-01-30', 93, 'ACCION', 1),
('Rápidos y Furiosos 5', 'Dominic Toretto y su equipo de corredores callejeros planifican un atraco masivo para comprar su libertad definitiva mientras los persigue un agente federal.', 'https://m.media-amazon.com/images/M/MV5BYjQ3ZDYzMzYtYWI4Zi00M2JkLTgzOTctNDEyZmRmOTZkMWM4XkEyXkFqcGc@._V1_.jpg', '2011-04-29', 130, 'ACCION', 1),
('Kill Bill: Vol. 1', 'Tras despertar de un coma de cuatro años, una exasesina herida busca vengarse de la banda de asesinos que la traicionó el día de su boda.', 'https://m.media-amazon.com/images/M/MV5BZmMyYzJlZmYtY2I3NC00NjAyLTkyZWItZjdjZDI1YTYyYTEwXkEyXkFqcGc@._V1_.jpg', '2003-10-10', 111, 'ACCION', 1),
('Atómica', 'Una agente encubierta del MI6 es enviada a Berlín durante la Guerra Fría para investigar el asesinato de un compañero y recuperar una lista perdida de espías.', 'https://m.media-amazon.com/images/M/MV5BMmY1MWQ1YzEtNzdhNi00M2JjLWFiOTItOGRjNzA4NTBiMWJjXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg', '2017-07-28', 115, 'ACCION', 1),

-- ========================================================
-- DRAMA
-- ========================================================
('Forrest Gump', 'Las presidencias de Kennedy y Johnson, los eventos de Vietnam y Watergate se desarrollan desde la perspectiva de un hombre de Alabama.', 'https://m.media-amazon.com/images/M/MV5BNDYwNzVjMTItZmU5YS00YjQ5LTljYjgtMjY2NDVmYWMyNWFmXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg', '1994-07-06', 142, 'DRAMA', 1),
('El Club de la Pelea', 'Un oficinista insomne y un desapegado fabricante de jabón forman un club de lucha clandestino que evoluciona en algo mucho más grande.', 'https://m.media-amazon.com/images/M/MV5BOTgyOGQ1NDItNGU3Ny00MjU3LTg2YWEtNmEyYjBiMjI1Y2M5XkEyXkFqcGc@._V1_.jpg', '1999-10-15', 139, 'DRAMA', 1),
('Sueño de Fuga', 'Dos hombres encarcelados entablan una bonita amistad a lo largo de los años, encontrando consuelo y redención final a través de actos de decencia común.', 'https://m.media-amazon.com/images/M/MV5BMzdhNGE2ZjAtYjFjYS00YmY2LTg4MDctZTNhN2VlOGM3NjUwXkEyXkFqcGc@._V1_.jpg', '1994-09-23', 142, 'DRAMA', 1),
('El Padrino', 'El envejecido patriarca de una dinastía del crimen organizado transfiere el control implícito de su imperio clandestino a su reacio e inteligente hijo.', 'https://m.media-amazon.com/images/M/MV5BNGEwYjgwOGQtYjg5ZS00Njc1LTk2ZGEtM2QwZWQ2NjdhZTE5XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg', '1972-03-24', 175, 'DRAMA', 1),
('Parásitos', 'Los lazos familiares se ponen a prueba cuando una familia de bajos recursos se infiltra astutamente en la rutina doméstica de un clan millonario.', 'https://m.media-amazon.com/images/M/MV5BYjk1Y2U4MjQtY2ZiNS00OWQyLWI3MmYtZWUwNmRjYWRiNWNhXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg', '2019-10-11', 132, 'DRAMA', 1),
('La Lista de Schindler', 'En la Polonia ocupada por los alemanes durante la Segunda Guerra Mundial, el industrial Oskar Schindler se preocupa por sus trabajadores judíos tras presenciar su persecución.', 'https://m.media-amazon.com/images/M/MV5BZTkzMjIwOWUtYmRkZS00ZDdjLThiOTQtNjk4ZmM5NTY1YWI1XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg', '1994-02-04', 195, 'DRAMA', 1),
('El Pianista', 'Un músico judío polaco lucha por sobrevivir a la destrucción del gueto de Varsovia durante los duros años de la Segunda Guerra Mundial.', 'https://m.media-amazon.com/images/M/MV5BMjEwNmEwYjgtNTk3ZC00NjljLTg5ZDctZTY3ZGQwZjRkZmQxXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg', '2003-03-28', 150, 'DRAMA', 1),
('Siempre a tu Lado, Hachiko', 'Un profesor de universidad entabla un vínculo emocional inquebrantable con un perro abandonado de raza Akita al que acoge en su casa.', 'https://m.media-amazon.com/images/M/MV5BYjkxMjdlNjItZGEzMy00ZDAwLTg3MGEtZWYzYjAyZTdkYjAyXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg', '2009-08-08', 93, 'DRAMA', 1),
('Whiplash: Música y Obsesión', 'Un joven y prometedor baterista de jazz se matricula en un conservatorio de música implacable donde sus sueños de grandeza son guiados por un instructor feroz.', 'https://m.media-amazon.com/images/M/MV5BMzVjZDI3N2YtYTU2Yi00ZWZjLTgwMmMtMzY1YjcyM2U2NDE4XkEyXkFqcGc@._V1_.jpg', '2014-10-10', 106, 'DRAMA', 1),
('La Ballena', 'Un profesor de inglés con obesidad severa e insuficiencia cardíaca intenta reconectarse de manera desesperada con su hija adolescente distante.', 'https://m.media-amazon.com/images/M/MV5BYTVjZTA3NTUtMGMzOS00MmZjLWIzZmItODVlMmI1ZWVlMDcwXkEyXkFqcGc@._V1_.jpg', '2022-12-09', 117, 'DRAMA', 1),

-- ========================================================
-- TERROR
-- ========================================================
('El Conjuro', 'Los investigadores paranormales Ed y Lorraine Warren trabajan para ayudar a una familia aterrorizada por una presencia oscura en su granja.', 'https://m.media-amazon.com/images/M/MV5BYWQyNTQwNTAtZDE2Yy00NjlhLWE4N2YtYjBkYTM4ZmM3ZDk0XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg', '2013-07-19', 112, 'TERROR', 1),
('El Resplandor', 'Una familia pasa el invierno en un hotel aislado donde una presencia espiritual influye en el padre hacia la violencia.', 'https://m.media-amazon.com/images/M/MV5BYmUxZDU3NjktMzA1OS00OGUwLWJkOTctYzhjOGI5MTcyY2U3XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg', '1980-05-23', 146, 'TERROR', 1),
('Hereditary', 'Tras la muerte de la matriarca de la familia Graham, su hija y nietos comienzan a desentrañar secretos crípticos y cada vez más aterradores sobre sus ancestros.', 'https://m.media-amazon.com/images/M/MV5BNTEyZGQwODctYWJjZi00NjFmLTg3YmEtMzlhNjljOGZhMWMyXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg', '2018-06-08', 127, 'TERROR', 1),
('Siniestro', 'Un escritor de crímenes reales descubre una caja de cintas de video caseras que sugieren que los asesinatos que está investigando pertenecen a un asesino sobrenatural.', 'https://m.media-amazon.com/images/M/MV5BMjI5MTg1Njg0Ml5BMl5BanBnXkFtZTcwNzg2Mjc4Nw@@._V1_FMjpg_UX1000_.jpg', '2012-10-12', 110, 'TERROR', 1),
('¡Huye!', 'Un joven afroamericano visita a los padres adinerados de su novia blanca durante el fin de semana, donde queda atrapado en una pesadilla siniestra.', 'https://m.media-amazon.com/images/M/MV5BMjUxMDQwNjcyNl5BMl5BanBnXkFtZTgwNzcwMzc0MTI@._V1_FMjpg_UX1000_.jpg', '2017-02-24', 104, 'TERROR', 1),
('Midsommar', 'Una pareja viaja a Suecia para visitar el festival rural de mediados de verano de una ciudad natal, solo para encontrarse atrapados en un culto pagano violento.', 'https://m.media-amazon.com/images/M/MV5BMzQxNzQzOTQwM15BMl5BanBnXkFtZTgwMDQ2NTcwODM@._V1_.jpg', '2019-07-03', 148, 'TERROR', 1),
('Eso (IT)', 'En el verano de 1989, un grupo de niños marginados se une para destruir a un monstruo que cambia de forma y que se disfraza de payaso para cazar pequeños.', 'https://m.media-amazon.com/images/M/MV5BZGZmOTZjNzUtOTE4OS00OGM3LWJiNGEtZjk4Yzg2M2Q1YzYxXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg', '2017-09-08', 135, 'TERROR', 1),
('Actividad Paranormal', 'Después de mudarse a una nueva casa en los suburbios, una joven pareja se siente cada vez más perturbada por una presencia demoníaca nocturna.', 'https://m.media-amazon.com/images/M/MV5BMjY1NjcxODQ4MV5BMl5BanBnXkFtZTcwMzUxNjM4Mg@@._V1_.jpg', '2009-09-25', 86, 'TERROR', 1),
('Un Lugar Silencioso: Día Uno', 'Una mujer llamada Sam lucha por sobrevivir durante los primeros y terroríficos minutos de la invasión alienígena sónica en la ruidosa ciudad de Nueva York.', 'https://m.media-amazon.com/images/M/MV5BZDExZjJkNWUtMWFkNC00MDZiLThkNTEtMWVmYmQ3OGU3ZmM5XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg', '2024-06-28', 99, 'TERROR', 1),
('Bárbaro', 'Una joven que viaja a Detroit para una entrevista de trabajo reserva una casa de alquiler, descubriendo que ya está ocupada por un extraño y ocultando secretos subterráneos.', 'https://m.media-amazon.com/images/M/MV5BZjg1NTIxZDMtNTg2NC00Nzc1LTgzZDQtOThjNDVlMDdmZmY5XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg', '2022-09-09', 102, 'TERROR', 1);


INSERT INTO funciones (id_pelicula, id_sala, fecha_proyeccion, hora_inicio, precio_base)
VALUES

-- ========================================================
-- LUNES: CIENCIA_FICCION (10 películas en Salas 3, 5 y 6)
-- ========================================================
-- Sala 5 (IMAX)
((SELECT id FROM peliculas WHERE nombre = 'Star Wars: Episodio I - La Amenaza Fantasma' LIMIT 1), 5, '2026-06-01', '10:00:00', 6500.00),
((SELECT id FROM peliculas WHERE nombre = 'Star Wars: Episodio I - La Amenaza Fantasma' LIMIT 1), 5, '2026-06-01', '13:00:00', 6500.00),
((SELECT id FROM peliculas WHERE nombre = 'Star Wars: Episodio II - El Ataque de los Clones' LIMIT 1), 5, '2026-06-01', '16:00:00', 6500.00),
((SELECT id FROM peliculas WHERE nombre = 'Star Wars: Episodio II - El Ataque de los Clones' LIMIT 1), 5, '2026-06-01', '19:00:00', 6500.00),
((SELECT id FROM peliculas WHERE nombre = 'Interstellar' LIMIT 1), 5, '2026-06-01', '22:00:00', 6500.00),

-- Sala 6 (IMAX)
((SELECT id FROM peliculas WHERE nombre = 'Matrix' LIMIT 1), 6, '2026-06-01', '10:00:00', 7000.00),
((SELECT id FROM peliculas WHERE nombre = 'Matrix' LIMIT 1), 6, '2026-06-01', '13:00:00', 7000.00),
((SELECT id FROM peliculas WHERE nombre = 'Matrix' LIMIT 1), 6, '2026-06-01', '16:00:00', 7000.00),
((SELECT id FROM peliculas WHERE nombre = 'Star Wars: Episodio III - La Venganza de los Sith' LIMIT 1), 6, '2026-06-01', '19:00:00', 7000.00),
((SELECT id FROM peliculas WHERE nombre = 'Blade Runner 2049' LIMIT 1), 6, '2026-06-01', '22:00:00', 7000.00),

-- Sala 3 (3D)
((SELECT id FROM peliculas WHERE nombre = 'Valerian y la Ciudad de los mil planetas' LIMIT 1), 3, '2026-06-01', '13:00:00', 5500.00),
((SELECT id FROM peliculas WHERE nombre = 'Duna: Parte Dos' LIMIT 1), 3, '2026-06-01', '16:00:00', 5500.00),
((SELECT id FROM peliculas WHERE nombre = 'El Origen' LIMIT 1), 3, '2026-06-01', '19:15:00', 5500.00),
((SELECT id FROM peliculas WHERE nombre = 'Avatar' LIMIT 1), 3, '2026-06-01', '22:15:00', 5500.00),


-- ========================================================
-- MARTES: COMEDIA (10 películas en Salas 1 y 2)
-- ========================================================
-- Sala 1
((SELECT id FROM peliculas WHERE nombre = 'La Máscara' LIMIT 1), 1, '2026-06-02', '10:00:00', 4500.00),
((SELECT id FROM peliculas WHERE nombre = 'La Máscara' LIMIT 1), 1, '2026-06-02', '12:15:00', 4500.00),
((SELECT id FROM peliculas WHERE nombre = 'La Máscara' LIMIT 1), 1, '2026-06-02', '14:30:00', 4500.00),
((SELECT id FROM peliculas WHERE nombre = 'El Lobo de Wall Street' LIMIT 1), 1, '2026-06-02', '16:45:00', 4500.00),
((SELECT id FROM peliculas WHERE nombre = '¿Qué pasó ayer?' LIMIT 1), 1, '2026-06-02', '20:15:00', 4500.00),
((SELECT id FROM peliculas WHERE nombre = 'Supercool' LIMIT 1), 1, '2026-06-02', '22:30:00', 4500.00),

-- Sala 2
((SELECT id FROM peliculas WHERE nombre = 'Y Dónde Están las Rubias' LIMIT 1), 2, '2026-06-02', '12:00:00', 4500.00),
((SELECT id FROM peliculas WHERE nombre = 'Y Dónde Están las Rubias' LIMIT 1), 2, '2026-06-02', '14:15:00', 4500.00),
((SELECT id FROM peliculas WHERE nombre = 'Son Como Niños' LIMIT 1), 2, '2026-06-02', '16:30:00', 4500.00),
((SELECT id FROM peliculas WHERE nombre = 'Una Loca Película de Miedo' LIMIT 1), 2, '2026-06-02', '18:45:00', 4500.00),
((SELECT id FROM peliculas WHERE nombre = 'Tonto y Retonto' LIMIT 1), 2, '2026-06-02', '20:30:00', 4500.00),
((SELECT id FROM peliculas WHERE nombre = 'Proyecto X' LIMIT 1), 2, '2026-06-02', '22:30:00', 4500.00),
((SELECT id FROM peliculas WHERE nombre = 'La Propuesta' LIMIT 1), 2, '2026-06-02', '00:15:00', 4500.00),


-- ========================================================
-- MIÉRCOLES: SUSPENSO (10 películas en Salas 1, 2 y 7)
-- ========================================================
-- Sala 1
((SELECT id FROM peliculas WHERE nombre = 'Se7en' LIMIT 1), 1, '2026-06-03', '11:00:00', 4500.00),
((SELECT id FROM peliculas WHERE nombre = 'Se7en' LIMIT 1), 1, '2026-06-03', '13:30:00', 4500.00),
((SELECT id FROM peliculas WHERE nombre = 'Parásitos' AND categoria = 'SUSPENSO'), 1, '2026-06-03', '16:00:00', 4500.00),
((SELECT id FROM peliculas WHERE nombre = 'Oppenheimer' LIMIT 1), 1, '2026-06-03', '18:30:00', 4500.00),
((SELECT id FROM peliculas WHERE nombre = 'La Isla Siniestra' LIMIT 1), 1, '2026-06-03', '22:00:00', 4500.00),

-- Sala 2
((SELECT id FROM peliculas WHERE nombre = 'Un Lugar en Silencio' LIMIT 1), 2, '2026-06-03', '12:00:00', 4500.00),
((SELECT id FROM peliculas WHERE nombre = 'Un Lugar en Silencio' LIMIT 1), 2, '2026-06-03', '14:00:00', 4500.00),
((SELECT id FROM peliculas WHERE nombre = 'Un Lugar en Silencio' LIMIT 1), 2, '2026-06-03', '16:00:00', 4500.00),
((SELECT id FROM peliculas WHERE nombre = 'El Silencio de los Inocentes' LIMIT 1), 2, '2026-06-03', '18:00:00', 4500.00),
((SELECT id FROM peliculas WHERE nombre = 'Perdida' LIMIT 1), 2, '2026-06-03', '20:30:00', 4500.00),
((SELECT id FROM peliculas WHERE nombre = 'Zodiaco' LIMIT 1), 2, '2026-06-03', '23:15:00', 4500.00),

-- Sala 7 (VIP)
((SELECT id FROM peliculas WHERE nombre = 'La Chica del Dragón Tatuado' LIMIT 1), 7, '2026-06-03', '16:00:00', 9000.00),
((SELECT id FROM peliculas WHERE nombre = 'Prisioneros' LIMIT 1), 7, '2026-06-03', '19:00:00', 9000.00),


-- ========================================================
-- JUEVES: ROMANCE (10 películas en Salas 1, 7 y 8)
-- ========================================================
-- Sala 7 (VIP)
((SELECT id FROM peliculas WHERE nombre = 'La La Land' LIMIT 1), 7, '2026-06-04', '14:00:00', 9000.00),
((SELECT id FROM peliculas WHERE nombre = 'La La Land' LIMIT 1), 7, '2026-06-04', '16:30:00', 9000.00),
((SELECT id FROM peliculas WHERE nombre = 'Diario de una Pasión' LIMIT 1), 7, '2026-06-04', '19:00:00', 9000.00),
((SELECT id FROM peliculas WHERE nombre = 'Diario de una Pasión' LIMIT 1), 7, '2026-06-04', '21:30:00', 9000.00),

-- Sala 1
((SELECT id FROM peliculas WHERE nombre = 'Titanic' LIMIT 1), 1, '2026-06-04', '14:00:00', 4500.00),
((SELECT id FROM peliculas WHERE nombre = 'Titanic' LIMIT 1), 1, '2026-06-04', '18:00:00', 4500.00),

-- Sala 8 (VIP)
((SELECT id FROM peliculas WHERE nombre = 'A Silent Voice' LIMIT 1), 8, '2026-06-04', '12:00:00', 9000.00),
((SELECT id FROM peliculas WHERE nombre = 'Cuestión de Tiempo' LIMIT 1), 8, '2026-06-04', '14:30:00', 9000.00),
((SELECT id FROM peliculas WHERE nombre = '500 Días con Ella' LIMIT 1), 8, '2026-06-04', '17:00:00', 9000.00),
((SELECT id FROM peliculas WHERE nombre = 'Yo Antes de Ti' LIMIT 1), 8, '2026-06-04', '19:00:00', 9000.00),
((SELECT id FROM peliculas WHERE nombre = 'Bajo la Misma Estrella' LIMIT 1), 8, '2026-06-04', '21:15:00', 9000.00),
((SELECT id FROM peliculas WHERE nombre = 'Orgullo y Prejuicio' LIMIT 1), 8, '2026-06-04', '23:30:00', 9000.00),
((SELECT id FROM peliculas WHERE nombre = 'Antes del Amanecer' LIMIT 1), 8, '2026-06-04', '01:45:00', 9000.00),


-- ========================================================
-- VIERNES: ANIMACIÓN (10 películas en Salas 3 y 4)
-- ========================================================
-- Sala 3
((SELECT id FROM peliculas WHERE nombre = 'Shrek' LIMIT 1), 3, '2026-06-05', '10:00:00', 5500.00),
((SELECT id FROM peliculas WHERE nombre = 'Shrek' LIMIT 1), 3, '2026-06-05', '12:00:00', 5500.00),
((SELECT id FROM peliculas WHERE nombre = 'Shrek' LIMIT 1), 3, '2026-06-05', '14:00:00', 5500.00),
((SELECT id FROM peliculas WHERE nombre = 'Mi Villano Favorito' LIMIT 1), 3, '2026-06-05', '16:00:00', 5500.00),
((SELECT id FROM peliculas WHERE nombre = 'Mi Villano Favorito' LIMIT 1), 3, '2026-06-05', '18:00:00', 5500.00),
((SELECT id FROM peliculas WHERE nombre = 'Kimetsu No Yaiba - La Fortaleza Infinita' LIMIT 1), 3, '2026-06-05', '20:00:00', 5500.00),
((SELECT id FROM peliculas WHERE nombre = 'Spider-Man: Un nuevo universo' LIMIT 1), 3, '2026-06-05', '22:45:00', 5500.00),

-- Sala 4
((SELECT id FROM peliculas WHERE nombre = 'El Viaje de Chihiro' LIMIT 1), 4, '2026-06-05', '12:00:00', 5500.00),
((SELECT id FROM peliculas WHERE nombre = 'Coco' LIMIT 1), 4, '2026-06-05', '14:30:00', 5500.00),
((SELECT id FROM peliculas WHERE nombre = 'Toy Story 3' LIMIT 1), 4, '2026-06-05', '16:45:00', 5500.00),
((SELECT id FROM peliculas WHERE nombre = 'Intensa-Mente 2' LIMIT 1), 4, '2026-06-05', '19:00:00', 5500.00),
((SELECT id FROM peliculas WHERE nombre = 'Cómo Entrenar a tu Dragón' LIMIT 1), 4, '2026-06-05', '21:00:00', 5500.00),
((SELECT id FROM peliculas WHERE nombre = 'Rey León' LIMIT 1), 4, '2026-06-05', '23:00:00', 5500.00),


-- ========================================================
-- SÁBADO: ACCIÓN (10 películas en Salas 2, 5 y 6)
-- ========================================================
-- Sala 5 (IMAX)
((SELECT id FROM peliculas WHERE nombre = 'John Wick' LIMIT 1), 5, '2026-06-06', '10:00:00', 6500.00),
((SELECT id FROM peliculas WHERE nombre = 'John Wick' LIMIT 1), 5, '2026-06-06', '12:15:00', 6500.00),
((SELECT id FROM peliculas WHERE nombre = 'John Wick' LIMIT 1), 5, '2026-06-06', '14:30:00', 6500.00),
((SELECT id FROM peliculas WHERE nombre = 'Batman: El Caballero de la Noche' LIMIT 1), 5, '2026-06-06', '17:00:00', 6500.00),
((SELECT id FROM peliculas WHERE nombre = 'Batman: El Caballero de la Noche' LIMIT 1), 5, '2026-06-06', '20:00:00', 6500.00),
((SELECT id FROM peliculas WHERE nombre = 'Gladiador' LIMIT 1), 5, '2026-06-06', '23:00:00', 6500.00),

-- Sala 6 (IMAX)
((SELECT id FROM peliculas WHERE nombre = 'Top Gun: Maverick' LIMIT 1), 6, '2026-06-06', '12:00:00', 7000.00),
((SELECT id FROM peliculas WHERE nombre = 'Top Gun: Maverick' LIMIT 1), 6, '2026-06-06', '14:30:00', 7000.00),
((SELECT id FROM peliculas WHERE nombre = 'Mad Max: Furia en el Camino' LIMIT 1), 6, '2026-06-06', '17:00:00', 7000.00),
((SELECT id FROM peliculas WHERE nombre = 'Misión Imposible: Sentencia Mortal - Parte 1' LIMIT 1), 6, '2026-06-06', '19:30:00', 7000.00),
((SELECT id FROM peliculas WHERE nombre = 'Búsqueda Implacable' LIMIT 1), 6, '2026-06-06', '22:45:00', 7000.00),

-- Sala 2
((SELECT id FROM peliculas WHERE nombre = 'Rápidos y Furiosos 5' LIMIT 1), 2, '2026-06-06', '16:00:00', 4500.00),
((SELECT id FROM peliculas WHERE nombre = 'Kill Bill: Vol. 1' LIMIT 1), 2, '2026-06-06', '18:45:00', 4500.00),
((SELECT id FROM peliculas WHERE nombre = 'Atómica' LIMIT 1), 2, '2026-06-06', '21:00:00', 4500.00),


-- ========================================================
-- DOMINGO: DRAMA Y TERROR (20 películas en Salas 1, 2, 3, 4 y 8)
-- ========================================================
-- Drama (Salas 1, 2 y 8)
((SELECT id FROM peliculas WHERE nombre = 'Forrest Gump' LIMIT 1), 1, '2026-06-07', '11:00:00', 4500.00),
((SELECT id FROM peliculas WHERE nombre = 'Forrest Gump' LIMIT 1), 1, '2026-06-07', '14:00:00', 4500.00),
((SELECT id FROM peliculas WHERE nombre = 'Parásitos' AND categoria = 'DRAMA'), 1, '2026-06-07', '17:00:00', 4500.00),
((SELECT id FROM peliculas WHERE nombre = 'El Club de la Pelea' LIMIT 1), 1, '2026-06-07', '19:30:00', 4500.00),
((SELECT id FROM peliculas WHERE nombre = 'Sueño de Fuga' LIMIT 1), 1, '2026-06-07', '22:15:00', 4500.00),

((SELECT id FROM peliculas WHERE nombre = 'El Padrino' LIMIT 1), 2, '2026-06-07', '13:00:00', 4500.00),
((SELECT id FROM peliculas WHERE nombre = 'La Lista de Schindler' LIMIT 1), 2, '2026-06-07', '16:30:00', 4500.00),
((SELECT id FROM peliculas WHERE nombre = 'El Pianista' LIMIT 1), 2, '2026-06-07', '20:15:00', 4500.00),

((SELECT id FROM peliculas WHERE nombre = 'Siempre a tu Lado, Hachiko' LIMIT 1), 8, '2026-06-07', '12:00:00', 9000.00),
((SELECT id FROM peliculas WHERE nombre = 'Whiplash: Música y Obsesión' LIMIT 1), 8, '2026-06-07', '14:00:00', 9000.00),
((SELECT id FROM peliculas WHERE nombre = 'La Ballena' LIMIT 1), 8, '2026-06-07', '16:15:00', 9000.00),

-- Terror (Salas 3, 4 y 8)
((SELECT id FROM peliculas WHERE nombre = 'El Conjuro' LIMIT 1), 8, '2026-06-07', '18:30:00', 9000.00),
((SELECT id FROM peliculas WHERE nombre = 'El Conjuro' LIMIT 1), 8, '2026-06-07', '21:00:00', 9000.00),
((SELECT id FROM peliculas WHERE nombre = 'El Resplandor' LIMIT 1), 8, '2026-06-07', '23:15:00', 9000.00),

((SELECT id FROM peliculas WHERE nombre = 'Hereditary' LIMIT 1), 3, '2026-06-07', '16:00:00', 5500.00),
((SELECT id FROM peliculas WHERE nombre = 'Siniestro' LIMIT 1), 3, '2026-06-07', '18:30:00', 5500.00),
((SELECT id FROM peliculas WHERE nombre = '¡Huye!' LIMIT 1), 3, '2026-06-07', '21:00:00', 5500.00),
((SELECT id FROM peliculas WHERE nombre = 'Midsommar' LIMIT 1), 3, '2026-06-07', '23:15:00', 5500.00),

((SELECT id FROM peliculas WHERE nombre = 'Eso (IT)' LIMIT 1), 4, '2026-06-07', '15:00:00', 5500.00),
((SELECT id FROM peliculas WHERE nombre = 'Actividad Paranormal' LIMIT 1), 4, '2026-06-07', '17:45:00', 5500.00),
((SELECT id FROM peliculas WHERE nombre = 'Un Lugar Silencioso: Día Uno' LIMIT 1), 4, '2026-06-07', '19:45:00', 5500.00),
((SELECT id FROM peliculas WHERE nombre = 'Bárbaro' LIMIT 1), 4, '2026-06-07', '21:45:00', 5500.00);