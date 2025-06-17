// routes/api/nuevofavorito.ts
import { getCookieFromHeader } from "../../utils/cookies.ts";

export async function handler(req: Request) {
  if (req.method !== "POST") return new Response("Method Not Allowed", { status: 405 });

  const { id } = await req.json();
  const cookieHeader = req.headers.get("cookie");
  const favoritesCookie = getCookieFromHeader(cookieHeader, "favorites");
  const favoritos = favoritesCookie ? favoritesCookie.split(",") : [];

  if (!favoritos.includes(id)) favoritos.push(id);

  const headers = new Headers();
  headers.append(
    "Set-Cookie",
    `favorites=${favoritos.join(",")}; Path=/; HttpOnly; Max-Age=604800`,
  );

  return new Response(JSON.stringify({ message: "Añadido" }), { status: 200, headers });
}
