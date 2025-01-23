
import "./PokemonList.css";

import Pokemon from "../pokemon/pokemon";
import usePokemonList from "../../hooks/pokemonListHookh";

function PokemonList() {

  const[pokemonListState,setPokemonListState]=usePokemonList("https://pokeapi.co/api/v2/pokemon");
  

  return (
    <div className="List-Wrapper">
      <div className="heading">Pokemon List</div>
      <div className="All-Pokemon-List">
        {pokemonListState.isDownload ? (
          <h3 className="loading">...Loading</h3>
        ) : (
          pokemonListState.pokemonList.map((p) => (
            <Pokemon name={p.name} image={p.image} key={p.id} id={p.id} />
          ))
        )}
      </div>
      <div className="controls">
        <button
          className="prev"
          disabled={pokemonListState.PrevUrl === null}
          onClick={() =>
            setPokemonListState({
              ...pokemonListState,
              PokedexUrl: pokemonListState.PrevUrl,
            })
          }
        >
          Prev
        </button>
        <button
          className="next"
          disabled={pokemonListState.nextUrl === null}
          onClick={() =>
            setPokemonListState({
              ...pokemonListState,
              PokedexUrl: pokemonListState.nextUrl,
            })
          }
        >
          Next
        </button>
      </div>
    </div>
  );
}
export default PokemonList;
