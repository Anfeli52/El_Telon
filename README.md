# 🎭 El Telón

Sistema integral de gestión de salas de cine con cartelera de películas, selección de asientos y administración de funciones. Incluye panel administrativo para gestionar películas, horarios y reservas.

## 📋 Características

- **Autenticación segura** con JWT
- **Cartelera de películas** dinámicas
- **Selección de asientos** interactiva
- **Panel administrativo** para gestionar contenido
- **Reservas de boletos** en tiempo real
- **Gestión de salas y horarios**

## 🏗️ Tecnologías

### BackEnd
- **Java 21** - Lenguaje de programación
- **Spring Boot** - Framework web
- **MySQL** - Base de datos relacional
- **Flyway** - Migraciones de BD
- **JWT** - Autenticación segura

### FrontEnd
- **React** + **TypeScript** - Interfaz de usuario
- **Vite** - Bundler y dev server
- **Axios** - Cliente HTTP
- **CSS** - Estilos

## 🚀 Inicio Rápido

### Requisitos Previos

#### BackEnd
- Java 21
- MySQL 8.0+ (en ejecución)
- Base de datos `el_telon_db` creada

#### FrontEnd
- Node.js 18+ (recomendado: 20 LTS)
- npm (incluido con Node.js)

### Instalación

#### 1. Clonar el repositorio

```bash
git clone https://github.com/Anfeli52/El_Telon.git
cd ElTelon
```

#### 2. Configurar el BackEnd

Navega a la carpeta del backend:

```bash
cd El_Telon_BackEnd
```

**Configurar variables de entorno:**

Necesitas configurar las variables de entorno requeridas. Consulta la sección [🔐 Variables de Entorno Requeridas](#-variables-de-entorno-requeridas) para instrucciones detalladas sobre cómo configurar:
- `SECRET_KEY` (clave JWT)
- `DB_USERNAME` (usuario MySQL)
- `DB_PASSWORD` (contraseña MySQL)

**Iniciar el backend:**

```bash
./mvnw spring-boot:run
```

En Windows:
```powershell
.\mvnw.cmd spring-boot:run
```

El backend estará disponible en `http://localhost:8080`

#### 3. Configurar el FrontEnd

En otra terminal, navega a la carpeta del frontend:

```bash
cd El_Telon_FrontEnd
```

**Instalar dependencias:**
```bash
npm install
```

**Iniciar servidor de desarrollo:**
```bash
npm run dev
```

El frontend estará disponible en `http://localhost:5173`

## 🔐 Variables de Entorno Requeridas

El backend necesita las siguientes variables de entorno configuradas:

| Variable | Descripción | Requerida |
|---|---|---|
| `SECRET_KEY` | Clave secreta en Base64 para firmar JWT |  ✅ SÍ |
| `DB_USERNAME` | Usuario de MySQL | ✅ SÍ |
| `DB_PASSWORD` | Contraseña de MySQL | ✅ SÍ |

### Configurar las Variables

**Linux / macOS:**
```bash
# Generar SECRET_KEY
export SECRET_KEY=$(openssl rand -base64 32)

# Configurar credenciales de base de datos
export DB_USERNAME=tu_usuario_mysql
export DB_PASSWORD=tu_contraseña_mysql
```

Para hacerlas permanentes, agrega estas líneas en tu archivo de perfil (`~/.bashrc`, `~/.zshrc`, etc.):
```bash
export SECRET_KEY=tu_clave_base64_aqui
export DB_USERNAME=tu_usuario_mysql
export DB_PASSWORD=tu_contraseña_mysql
```

**Windows PowerShell:**
```powershell
# Generar SECRET_KEY
$env:SECRET_KEY = [Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Maximum 256 }))

# Configurar credenciales de base de datos
$env:DB_USERNAME = "tu_usuario_mysql"
$env:DB_PASSWORD = "tu_contraseña_mysql"
```

## ⚙️ Configuración

### BackEnd

**Archivo:** `El_Telon_BackEnd/src/main/resources/application.properties`

```properties
# Aplicación
spring.application.name=El_Telon

# Conexión a MySQL
spring.datasource.url=jdbc:mysql://localhost:3306/el_telon_db
spring.datasource.username=${DB_USERNAME}
spring.datasource.password=${DB_PASSWORD}

# Hibernate
spring.jpa.hibernate.ddl-auto=none

# Flyway - Migraciones automáticas
spring.flyway.enabled=true
spring.flyway.locations=classpath:db/migration

# JWT
jwt.secret.key=${SECRET_KEY}
```

**Notas importantes:**
- Todas las variables de entorno deben estar definidas antes de iniciar la aplicación
- Si cambias usuario/contraseña de MySQL, asegúrate que coincidan con `application.properties`
- `spring.jpa.hibernate.ddl-auto=none` significa que Flyway maneja las migraciones

### FrontEnd

**API URL:** `El_Telon_FrontEnd/src/api/axios.ts`

Por defecto, el frontend se conecta a `http://localhost:8080/api`. Modifica este archivo si tu backend está en otra ubicación.

## 📦 Comandos Útiles

### BackEnd

```bash
./mvnw clean install      # Limpiar e instalar dependencias
./mvnw spring-boot:run   # Ejecutar en desarrollo
./mvnw test              # Ejecutar pruebas
```

### FrontEnd

```bash
npm install              # Instalar dependencias
npm run dev              # Servidor de desarrollo
npm run build            # Build de producción
npm run preview          # Vista previa del build
npm run lint             # Ejecutar ESLint
```

## 🗂️ Estructura del Proyecto

```
ElTelon/
├── El_Telon_BackEnd/
│   ├── src/main/java/com/andres/proyectos/el_telon/
│   │   ├── admin/           # Controladores administrativos
│   │   ├── auth/            # Autenticación y JWT
│   │   ├── chair/           # Gestión de asientos
│   │   ├── config/          # Configuración de la app
│   │   ├── hall/            # Gestión de salas
│   │   ├── movie/           # Gestión de películas
│   │   └── user/            # Gestión de usuarios
│   ├── src/main/resources/
│   │   ├── application.properties
│   │   └── db/migration/    # Scripts Flyway
│   └── pom.xml
│
└── El_Telon_FrontEnd/
    ├── src/
    │   ├── components/      # Componentes React
    │   ├── pages/           # Páginas
    │   ├── context/         # Contextos (Auth)
    │   ├── hooks/           # Custom hooks
    │   ├── api/             # Cliente Axios
    │   ├── types/           # Tipos TypeScript
    │   ├── styles/          # Estilos CSS
    │   └── utils/           # Utilidades (LinkedList)
    ├── package.json
    └── vite.config.ts
```

## 🔐 Notas Importantes

- **Flyway** ejecuta migraciones automáticamente al iniciar el backend
- **JWT Secret** es obligatorio - sin él, el backend no iniciará
- **Base de datos** debe estar creada antes de iniciar el backend
- Asegúrate que ambos servicios (backend y frontend) estén corriendo para funcionalidad completa

## 🤝 Contribuir

Para reportar bugs o sugerir mejoras, abre un issue en el repositorio.

---
