# Proyecto Agenda (ASP.NET 8 + PostgreSQL + React + Vite)

## 1. Requisitos previos

Instalar:

* .NET SDK 8
* Node.js (LTS)
* PostgreSQL 14+
* Git
* Visual Studio (Si desea subir la API por ahi)

Verificar instalación:

```bash
dotnet --version
node -v
npm -v
psql --version
```

---

## 2. Clonar el repositorio

```bash
git clone <URL_DEL_REPO>
cd <CARPETA_DEL_PROYECTO>
```

Estructura:

```
/API   (ASP.NET 8)
/AgendaWeb  (React + Vite)
```

---

## 3. Base de datos (PostgreSQL)

### 3.1 Crear base de datos

```sql
CREATE DATABASE agendaDB;
```

---

### 3.2 Configurar conexión

En `appsettings.json` en la carpeta API

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Host=localhost;Port=5432;Database=agendaDB;Username=postgres;Password=tu_password"
  }
}
```

---

### 3.3 Aplicar migraciones

Dentro del backend(API):

```bash
cd API
dotnet ef database update
```

Si no existen migraciones:

```bash
dotnet ef migrations add Initial
dotnet ef database update
```

---

## 4. Backend (ASP.NET 8)

### 4.1 Restaurar dependencias

```bash
cd API
dotnet restore
```

---

### 4.2 Ejecutar API

```bash
dotnet run
```

Por defecto:

```
https://localhost:7250
http://localhost:5250
```

---

### 4.3 Swagger (opcional)

```
https://localhost:7250/swagger
```

---

## 5. Frontend (React + Vite)

### 5.1 Instalar dependencias

```bash
cd AgendaWeb
npm install
```

### 5.2 Configurar API

Archivo:

src/services/api.js

Ejemplo:

```js
const API_URL = "https://localhost:7250/api";
```

---

### 5.3 Ejecutar frontend

npm run dev

Por defecto:
http://localhost:5173


## 6. CORS (IMPORTANTE)

En `Program.cs`: del BackEnd

```csharp
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.WithOrigins("http://localhost:5173")
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

app.UseCors("AllowFrontend");
```

---

## 7. Orden de ejecución

1. PostgreSQL corriendo
2. Backend (`dotnet run`)
3. Frontend (`npm run dev`)

---

## 8. Problemas comunes
### Error CORS

* URL del frontend no registrada en backend

### API no responde

* Verificar a que URL esta apuntando el archivo API.jsx en el proyecto de React

### Migraciones fallan


* probablemente EF no este instalado correctamente (dotnet tool install --global dotnet-ef)

## 9. Resultado esperado

* Backend: [https://localhost:7250](https://localhost:7250)
* Frontend: [http://localhost:5173](http://localhost:5173)
* PostgreSQL conectado

