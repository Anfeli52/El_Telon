# El_Telon

## BackEnd

Este proyecto usa Spring Boot, MySQL, Flyway y JWT.

## 1) Clonar e ingresar al BackEnd

Si aun no tienes el proyecto localmente:

```bash
git clone <URL_DEL_REPOSITORIO>
cd ElTelon/El_Telon_BackEnd
```

Si ya hiciste `clone` y estas en la raiz del repo:

```bash
cd El_Telon_BackEnd
```

### Requisitos previos

- Java 21
- MySQL en ejecución
- Base de datos creada con el nombre `el_telon_db`

## 2) Variables de entorno

El backend utiliza una sola variable de entorno obligatoria para firmar los JWT:

- `SECRET_KEY`: clave secreta en Base64 usada por JWT.

La aplicación la lee desde [El_Telon_BackEnd/src/main/resources/application.properties](El_Telon_BackEnd/src/main/resources/application.properties), donde está configurada así:

```properties
jwt.secret.key=${SECRET_KEY}
```

Si no defines esta variable, el backend no podrá iniciar correctamente.

### Cómo crear la variable de entorno

#### Linux / macOS

En la terminal actual:

```bash
export SECRET_KEY=$(openssl rand -base64 32)
```

Si quieres que quede fija para nuevas terminales, agrega esa línea en tu archivo de perfil, por ejemplo `~/.bashrc`, `~/.zshrc` o equivalente.

#### Windows PowerShell

```powershell
$env:SECRET_KEY = [Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Maximum 256 }))
```

Si quieres dejarla permanente, configúrala en las variables de entorno del sistema.

## 3) Levantar el BackEnd

1. Abre una terminal en la carpeta `El_Telon_BackEnd`.
2. Asegúrate de que MySQL esté corriendo y que exista la base de datos `el_telon_db`.
3. Define la variable `SECRET_KEY` en la misma terminal.
4. Ejecuta la aplicación con Maven Wrapper:

```bash
./mvnw spring-boot:run
```

En Windows, usa:

```powershell
.\mvnw.cmd spring-boot:run
```

### Notas importantes

- Flyway se encarga de las migraciones al iniciar la aplicación.
- La conexión a MySQL está configurada en `application.properties` con estos valores actuales:
	- `spring.datasource.url=jdbc:mysql://localhost:3306/el_telon_db`
	- `spring.datasource.username=admin`
	- `spring.datasource.password=admin`
- Si cambias usuario, contraseña o puerto de MySQL, debes actualizar `application.properties`.

## FrontEnd

El frontend está hecho con React + TypeScript + Vite.

## 1) Ingresar al FrontEnd

Si ya estás en la raíz del repositorio:

```bash
cd El_Telon_FrontEnd
```

## 2) Requisitos previos

- Node.js 18 o superior (recomendado: Node.js 20 LTS)
- npm (se instala junto con Node.js)

Puedes verificar versiones con:

```bash
node -v
npm -v
```

## 3) Instalar dependencias

Desde la carpeta `El_Telon_FrontEnd` ejecuta:

```bash
npm install
```

## 4) Levantar el FrontEnd en desarrollo

Ejecuta:

```bash
npm run dev
```

Vite te mostrará una URL local (normalmente `http://localhost:5173`).

## 5) Conexión con el BackEnd

Actualmente el frontend consume la API en:

- `http://localhost:8080/api`

Esa URL está definida en `El_Telon_FrontEnd/src/api/axios.ts`, por lo que debes tener el backend corriendo para que login, registro y demás funcionalidades respondan correctamente.

## Comandos útiles del FrontEnd

- `npm run dev`: inicia el servidor de desarrollo.
- `npm run build`: compila TypeScript y genera build de producción.
- `npm run preview`: levanta una vista previa del build de producción.
- `npm run lint`: ejecuta ESLint.
