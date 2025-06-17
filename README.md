🧪 ENUNCIADO TIPO EXAMEN - Deno Fresh + Harry Potter API
1. Autenticación y Middleware
Página principal (/)
Redirige a /login.

La página de login (/login) muestra un formulario con username y password.

Si la contraseña es "expecto123":

Se guarda una cookie username=<nombre> válida 7 días.

Se redirige al usuario a la ruta /houses.

Middleware (routes/(platform)/_middleware.ts)
Detecta la cookie username.

Si no existe, redirige a /login.

Si existe, la guarda en ctx.state.username y permite continuar.

2. Listado de Casas y Personajes
Ruta protegida /houses
Muestra botones para cada casa mágica: Gryffindor, Slytherin, Hufflepuff, Ravenclaw.

Al hacer click en un botón, redirige a /house/<nombreCasa> (ej. /house/gryffindor).

Ruta /house/[house]
Muestra los personajes de esa casa usando la API:
https://hp-api.onrender.com/api/characters/house/<house>

Junto a cada personaje, debe haber un botón para:

⭐️ Añadir a favoritos.

❌ Quitar de favoritos.

Los favoritos se guardan en una cookie favorites=<id1,id2,...> (máximo 7 días).

3. Búsqueda de Personajes
Ruta /search
Mostrar un formulario de búsqueda por nombre (input name="name").

Usar la API general:
https://hp-api.onrender.com/api/characters

Filtrar los personajes cuyo nombre incluya el texto buscado (sin distinguir mayúsculas/minúsculas).

Mostrar solo los resultados coincidentes.

4. Página de Favoritos
Ruta protegida /favorites
Muestra los personajes que están en la cookie favorites.

Si no hay favoritos, redirige a /houses y borra la cookie favorites.

5. Perfil del Usuario
Ruta protegida /profile
Muestra el username de la cookie.

Botón "Cerrar sesión" que:

Elimina las cookies username y favorites.

Redirige a /login.

