import { FreshContext, PageProps } from "$fresh/server.ts";
import Axios from "npm:axios";
import IslaFavoritesCharacters from "../../islands/IslaFavoritesCharacters.tsx";
import { getCookieFromHeader } from "../../utils/cookies.ts";

// Definición del tipo Character
export type Character = {
  id: string;
  name: string;
  house: string;
  image: string;
  favorite?: boolean;
};

export type State = {
  username: string;
  characters: Character[];
};

// Handler que gestiona favoritos
export async function handler(req: Request, ctx: FreshContext<State>) {
  const cookieHeader = req.headers.get("cookie");
  const favoritesCookie = getCookieFromHeader(cookieHeader, "favorites");
  const favoritos = favoritesCookie ? favoritesCookie.split(",") : [];

  // Si no hay favoritos, redirige a /houses y elimina cookie
  if (favoritos.length === 0) {
    const headers = new Headers();
    headers.set("location", "/houses");
    headers.append("Set-Cookie", "favorites=; Path=/; HttpOnly; Max-Age=0");
    return new Response(null, { status: 303, headers });
  }

  // Llamada a la API
  const charactersAPI = await Axios.get("https://hp-api.onrender.com/api/characters");

  // Filtramos solo los favoritos y les añadimos favorite: true
  const personajes: Character[] = charactersAPI.data
    .filter((c: Character) => favoritos.includes(c.id))
    .map((c: Character) => ({ ...c, favorite: true }));

  return ctx.render({
    username: ctx.state.username,
    characters: personajes,
  });
}

// Render del componente de favoritos
export default function Home(props: PageProps<State>) {
  return <IslaFavoritesCharacters data={props.data} />;
}
