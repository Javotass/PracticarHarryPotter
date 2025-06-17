// routes/(platform)/search.tsx
import { FreshContext, PageProps } from "$fresh/server.ts";
import Axios from "npm:axios";
import Buscador from "../../components/Buscador.tsx";
import IslaHouseCharacters from "../../islands/IslaHouseCharacters.tsx";
import { getCookieFromHeader } from "../../utils/cookies.ts";
import { Character } from "./house/[house].tsx";

export type State = {
  username: string;
  characters: Character[];
};

export async function handler(req: Request, ctx: FreshContext<State>) {
  const url = new URL(req.url);
  const name = url.searchParams.get("name")?.toLowerCase() || "";
  const cookieHeader = req.headers.get("cookie");
  const favoritesCookie = getCookieFromHeader(cookieHeader, "favorites");
  const favoritos = favoritesCookie ? favoritesCookie.split(",") : [];

  const api = await Axios.get("https://hp-api.onrender.com/api/characters");
  const personajes: Character[] = api.data.map((p: Character) => ({
    ...p,
    favorite: favoritos.includes(p.id),
  }));
  const filtrados = personajes.filter((p) => p.name.toLowerCase().includes(name));

  return ctx.render({
    username: ctx.state.username,
    characters: filtrados,
  });
}

export default function Home(props: PageProps<State>) {
  return (
    <>
      <Buscador />
      {props.data.characters.length > 0 && <IslaHouseCharacters data={props.data} />}
    </>
  );
}



