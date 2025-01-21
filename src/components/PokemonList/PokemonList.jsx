import { useEffect, useState } from "react";
import "./PokemonList.css";
import axios from "axios";
import Pokemon from "../pokemon/pokemon";

function PokemonList() {
  // const [pokemonList, setPokemonList] = useState([]);
  // const [isDownload, setIsDownload] = useState(true);
  // const [PrevUrl, setPrevUrl] = useState("");
  // const [nextUrl, setNextUrl] = useState("");
  // const [PokedexUrl, setPokedexUrl] = useState(
  //   "https://pokeapi.co/api/v2/pokemon"
  // );

  const [pokemonListState, setPokemonListState] = useState({
    pokemonList: [],
    isDownload: true,
    PrevUrl: "",
    nextUrl: "",
    PokedexUrl: "https://pokeapi.co/api/v2/pokemon",
  });

  async function downloadPokemon() {
    setIsDownload((state)=>({... state,isDownload:true}));
    const response = await axios.get(pokemonListState.PokedexUrl);
    const pokemonResults = response.data.results;

    // setNextUrl(response.data.next);
    setPokemonListState((state)=>({... state,nextUrl:response.data.next,PrevUrl:response.data.previous}))
    // setPrevUrl(response.data.previous);

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

    // setPokemonList(result);
    setPokemonListState((state)=>({... state,pokemonList:result,isDownload:false}))

    // setIsDownload(false);
  }
  useEffect(() => {
    downloadPokemon();
  }, [pokemonListState.PokedexUrl]);

  return (
    <div className="List-Wrapper">
      <div className="heading">Pokemon List</div>
      <div className="All-Pokemon-List">
        {isDownload ? (
          <h3 className="loading">...Loading</h3>
        ) : (
          ppokemonListState.pokemonList.map((p) => (
            <Pokemon name={p.name} image={p.image} key={p.id} id={p.id} />
          ))
        )}
      </div>
      <div className="controls">
        <button
          className="prev"
          disabled={PrevUrl === null}
          onClick={() => setPokemonListState((set)=>({... state,PrevUrl:pokemonListState.PrevUrl}))}
        >
          Prev
        </button>
        <button
          className="next"
          disabled={nextUrl === null}
          onClick={() => setPokemonListState((set)=>({... state,nextUrl:pokemonListState.nextUrl}))}
        >
          Next
        </button>
      </div>
    </div>
  );
}
export default PokemonList;
