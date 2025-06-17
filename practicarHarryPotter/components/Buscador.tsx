// components/Buscador.tsx
const Buscador = () => {
    return (
      <div class="buscador">
        <form action="/search" method="get" class="buscador-form">
          <input
            type="text"
            name="name"
            placeholder="Buscar personaje..."
            required
          />
          <button type="submit">Buscar</button>
        </form>
      </div>
    );
  };
  
  export default Buscador;
  