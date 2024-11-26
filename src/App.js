import React, { useState, useEffect } from "react";
import { fetchPokemon } from "./utils/api";
import Card from "./components/Card";
import "./index.css";

function App() {
  const [allPokemon, setAllPokemon] = useState(undefined);

  const handleFetchPokemon = async (path) => {
    const res = await fetchPokemon(path);
    setAllPokemon(res);
  };

  useEffect(() => {
    handleFetchPokemon("https://pokeapi.co/api/v2/pokemon");
  }, []);

  return (
    <div className="App">
      <h1>Pokemon Cards</h1>
      <div className="controls">
        <button
          disabled={!allPokemon?.previous}
          onClick={() => {
            if (allPokemon?.previous) {
              handleFetchPokemon(allPokemon.previous);
            }
          }}
        >
          Prev
        </button>
        <button
          disabled={!allPokemon?.next}
          onClick={() => {
            if (allPokemon?.next) {
              handleFetchPokemon(allPokemon.next);
            }
          }}
        >
          Next
        </button>
      </div>
      <div className="cards-container">
        {allPokemon?.results?.length &&
          allPokemon.results.map((pokemon) => (
            <Card key={pokemon.name} name={pokemon.name} url={pokemon.url} />
          ))}
      </div>
      {!allPokemon && (
        <div className="not-found">
          <p>No Pokemon Found</p>
          <a href="/">
            <button>Reload Page</button>
          </a>
        </div>
      )}
    </div>
  );
}

export default App;
