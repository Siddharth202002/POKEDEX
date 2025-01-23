import axios from "axios";
import { useState, useEffect } from "react";

function usePokemonList(url, type) {
  const [pokemonListState, setPokemonListState] = useState({
    pokemonList: [],
    isDownload: true,
    PrevUrl: "",
    nextUrl: "",
    PokedexUrl: url,
  });

  async function downloadPokemon() {
    setPokemonListState((state) => ({ ...state, isDownload: true }));

    const response = await axios.get(pokemonListState.PokedexUrl);

    if (type) {
      setPokemonListState((state) => ({
        ...state,
        pokemonList: response.data.pokemon.slice(0, 5),
      }));
    } else {
      const pokemonResults = response.data.results;
      setPokemonListState((state) => ({
        ...state,
        nextUrl: response.data.next,
        PrevUrl: response.data.previous,
      }));
      const pokemonResultPromise = pokemonResults.map((pokemon) =>
        axios.get(pokemon.url)
      );
      const pokemonData = await axios.all(pokemonResultPromise);
      const result = pokemonData.map((pokemonData) => {
        const pokemon = pokemonData.data;
        return {
          name: pokemon.name,
          image: pokemon.sprites.other.dream_world.front_default,
          id: pokemon.id,
        };
      });

      setPokemonListState((state) => ({
        ...state,
        pokemonList: result,
        isDownload: false,
      }));
    }
  }
  useEffect(() => {
    downloadPokemon();
  }, [pokemonListState.PokedexUrl]);

  return [pokemonListState, setPokemonListState];
}

export default usePokemonList;
