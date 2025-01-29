import usePokemonList from "../../hooks/pokemonListHookh";
import './SimilarPokemon.css'
function SimilarPokemons({ pokemonType }) {
  const [pokemonListState] = usePokemonList(
    `https://pokeapi.co/api/v2/type/${pokemonType}`,
    true
  );
  return (
    <div className="similarTypes">
      <h1>More {pokemonType} type pokemons</h1>
      {pokemonListState.loading && <>... loading Similar Pokemons</>}
      {!pokemonListState.loading && pokemonListState.error && <>Something Went Wrong</>}
      {!pokemonListState.loading && !pokemonListState.error && (
        <ul>
          {pokemonListState.pokemonList &&
            pokemonListState.pokemonList.map((p) => (
              <li key={p.pokemon.url}>{p.pokemon.name}</li>
            ))}
        </ul>
      )}
    </div>
  );
}
export default SimilarPokemons;
