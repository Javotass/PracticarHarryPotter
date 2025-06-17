## 🧪 Enunciado Tipo Examen — Proyecto Deno Fresh + API de Harry Potter

Este proyecto consiste en una SPA desarrollada con **Deno Fresh** que consume la API pública de **Harry Potter**:  
📎 https://hp-api.onrender.com/

### 1. Autenticación y Middleware

- La **página principal** (`/`) redirige automáticamente a `/login`.
- En `/login` se muestra un formulario con `username` y `password`.
- Si la contraseña introducida es `"expecto123"`:
  - Se guarda una **cookie**: `username=<nombre>` válida durante 7 días.
  - Se redirige al usuario autenticado a la ruta `/houses`.

#### Middleware (`routes/(platform)/_middleware.ts`)
- Detecta si existe la cookie `username`.
- Si no existe, redirige a `/login`.
- Si existe, la guarda en `ctx.state.username` y permite continuar.

---

### 2. Listado de Casas y Personajes

#### Ruta protegida `/houses`
- Muestra **botones** para cada casa mágica:
  - Gryffindor
  - Slytherin
  - Hufflepuff
  - Ravenclaw
- Al hacer clic en un botón, redirige a:  
  `/house/<nombreCasa>` (por ejemplo: `/house/Gryffindor`)

#### Ruta `/house/[house]`
- Carga los personajes de esa casa desde la API:  
  `https://hp-api.onrender.com/api/characters/house/<house>`
- Junto a cada personaje aparece un botón:
  - ⭐️ **Añadir a favoritos**
  - ❌ **Quitar de favoritos**
- Los favoritos se guardan en la cookie:  
  `favorites=<id1,id2,...>` (válida 7 días)

---

### 3. Búsqueda de Personajes

#### Ruta `/search`
- Muestra un **formulario de búsqueda** por nombre (`input name="name"`).
- Utiliza la API completa de personajes:  
  `https://hp-api.onrender.com/api/characters`
- Filtra y muestra solo los personajes cuyo nombre **contiene** el texto buscado (sin importar mayúsculas o minúsculas).

---

### 4. Página de Favoritos

#### Ruta protegida `/favorites`
- Muestra solo los personajes que aparecen en la cookie `favorites`.
- Si no hay favoritos:
  - Redirige a `/houses`
  - Borra la cookie `favorites`

---

### 5. Perfil del Usuario

#### Ruta protegida `/profile`
- Muestra el `username` guardado en la cookie.
- Incluye un botón `"Cerrar sesión"` que:
  - Elimina las cookies `username` y `favorites`
  - Redirige al usuario a `/login`
