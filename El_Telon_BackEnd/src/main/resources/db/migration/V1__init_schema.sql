CREATE TABLE IF NOT EXISTS usuarios (
  id BIGINT NOT NULL AUTO_INCREMENT,
  nombre VARCHAR(255),
  correo VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  role ENUM('USER', 'ADMIN', 'WORKER') DEFAULT 'USER',
  PRIMARY KEY (id),
  UNIQUE KEY uk_usuarios_correo (correo)
);

CREATE TABLE IF NOT EXISTS peliculas (
  id BIGINT NOT NULL AUTO_INCREMENT,
  nombre VARCHAR(255) NOT NULL,
  descripcion VARCHAR(500) NOT NULL,
  imagen_url VARCHAR(255) NOT NULL,
  categoria VARCHAR(100) NOT NULL,
  fecha_estreno DATE NOT NULL,
  duracion INT NOT NULL,
  activo TINYINT(1) NOT NULL DEFAULT 1,
  PRIMARY KEY (id),
  UNIQUE KEY uk_peliculas_imagen_url (imagen_url)
);

CREATE TABLE IF NOT EXISTS salas (
  id BIGINT NOT NULL AUTO_INCREMENT,
  nombre VARCHAR(50) NOT NULL,
  capacidad_total INT NOT NULL,
  tipo_sala ENUM('NORMAL', '3D', 'IMAX', 'VIP') DEFAULT 'NORMAL',
  PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS asientos (
  id BIGINT NOT NULL AUTO_INCREMENT,
  fila VARCHAR(5) NOT NULL,
  numero INT NOT NULL,
  tipo_asiento ENUM('NORMAL', 'VIP', 'DISCAPACITADO') NOT NULL,
  id_sala BIGINT NOT NULL,
  PRIMARY KEY (id),
  KEY idx_asientos_sala (id_sala),
  CONSTRAINT fk_asientos_sala FOREIGN KEY (id_sala) REFERENCES salas (id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS funciones (
  id BIGINT NOT NULL AUTO_INCREMENT,
  id_pelicula BIGINT NOT NULL,
  id_sala BIGINT NOT NULL,
  fecha_proyeccion DATE NOT NULL,
  hora_inicio TIME NOT NULL,
  precio_base DECIMAL(10,2) NOT NULL,
  PRIMARY KEY (id),
  KEY idx_funciones_pelicula (id_pelicula),
  KEY idx_funciones_sala (id_sala),
  CONSTRAINT fk_funciones_pelicula FOREIGN KEY (id_pelicula) REFERENCES peliculas (id),
  CONSTRAINT fk_funciones_sala FOREIGN KEY (id_sala) REFERENCES salas (id)
);

CREATE TABLE IF NOT EXISTS ticketes (
  id BIGINT NOT NULL AUTO_INCREMENT,
  id_usuario BIGINT NOT NULL,
  id_funcion BIGINT NOT NULL,
  id_asiento BIGINT NOT NULL,
  fecha_compra TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  precio_final DECIMAL(10,2) NOT NULL,
  PRIMARY KEY (id),
  UNIQUE KEY uk_ticket_funcion_asiento (id_funcion, id_asiento),
  KEY idx_ticket_usuario (id_usuario),
  KEY idx_ticket_asiento (id_asiento),
  CONSTRAINT fk_ticket_usuario FOREIGN KEY (id_usuario) REFERENCES usuarios (id),
  CONSTRAINT fk_ticket_funcion FOREIGN KEY (id_funcion) REFERENCES funciones (id),
  CONSTRAINT fk_ticket_asiento FOREIGN KEY (id_asiento) REFERENCES asientos (id)
);
