// routes/(platform)/houses.tsx
export default function Home() {
    const houses = ["Gryffindor", "Slytherin", "Hufflepuff", "Ravenclaw"];
    return (
      <div class="houses-container">
        <h1>Selecciona una casa</h1>
        <div class="houses-buttons">
          {houses.map((h) => (
            <a href={`/house/${h}`} class="house-button">{h}</a>
          ))}
        </div>
      </div>
    );
  }
  