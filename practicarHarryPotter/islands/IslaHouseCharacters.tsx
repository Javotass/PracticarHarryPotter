// islands/IslaHouseCharacters.tsx
import { FunctionalComponent } from "preact";
import { useState } from "preact/hooks";
import { Character, State } from "../routes/(platform)/house/[house].tsx";

type Props = {
  data: State;
};

const IslaHouseCharacters: FunctionalComponent<Props> = ({ data }) => {
  const [characters, setCharacters] = useState<Character[]>(data.characters);

  const toggleFavorito = async (c: Character, esFavorito: boolean, e: Event) => {
    e.stopPropagation();
    const endpoint = esFavorito ? "/api/quitarfavorito" : "/api/nuevofavorito";
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: c.id }),
    });

    if (response.ok) {
      setCharacters(characters.map((char) =>
        char.id === c.id ? { ...char, favorite: !esFavorito } : char,
      ));
    } else {
      alert("Error al actualizar favorito");
    }
  };

  return (
    <div class="containerCharacters">
      <h2>Usuario: {data.username}</h2>
      <div class="characters">
        {characters.map((c) => (
          <div class="character" key={c.id}>
            <img src={c.image} alt={c.name} />
            <h3>{c.name}</h3>
            <p>House: {c.house}</p>
            <button onClick={(e) => toggleFavorito(c, c.favorite || false, e)}>
              {c.favorite ? "❌ Quitar" : "⭐️ Añadir"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IslaHouseCharacters;
