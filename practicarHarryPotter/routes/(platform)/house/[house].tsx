// routes/(platform)/house/[house].tsx
import { FreshContext, PageProps } from "$fresh/server.ts";
import Axios from "npm:axios";
import IslaHouseCharacters from "../../../islands/IslaHouseCharacters.tsx";
import { getCookieFromHeader } from "../../../utils/cookies.ts";

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

export async function handler(req: Request, ctx: FreshContext<State>) {
  const { house } = ctx.params;

  // Solo para depuración:
  console.log("Petición de casa:", house);

  const cookieHeader = req.headers.get("cookie");
  const favoritesCookie = getCookieFromHeader(cookieHeader, "favorites");
  const favoritos = favoritesCookie ? favoritesCookie.split(",") : [];

  try {
    const api = await Axios.get(
      `https://hp-api.onrender.com/api/characters/house/${house}`,
    );

    const personajes: Character[] = api.data.map((p: Character) => ({
      ...p,
      favorite: favoritos.includes(p.id),
    }));

    return ctx.render({
      username: ctx.state.username,
      characters: personajes,
    });
  } catch (error) {
    console.error("Error al cargar personajes:", error);
    return new Response("Error al cargar personajes", { status: 500 });
  }
}

export default function Home(props: PageProps<State>) {
  return <IslaHouseCharacters data={props.data} />;
}
