import "./pokemonDetails.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import SimilarPokemons from "./SimilarPokemons";

function PokemonDetails({ pokemonName }) {
  const [pokemon, setPokemon] = useState({});
  const { id } = useParams();

  // const [hasData, setHasData] = useState(false);
  const [reqInfo, setReqInfo] = useState({
    error: false,
    loading: true,
  });

  async function downloadPokemon() {
    let response;
    try {
      if (pokemonName) {
        response = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${pokemonName}`,
          {
            headers: {
              "Cache-Control": "no-cache",
              Pragma: "no-cache",
              Expires: "0",
            },
          }
        );
      } else {
        response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`, {
          headers: {
            "Cache-Control": "no-cache",
            Pragma: "no-cache",
            Expires: "0",
          },
        });
      }

      if (response.status !== 200) {
        throw `Invalid Status Code`;
      }

      const pokemondata = response.data;

      const pokeDetails = {
        image: pokemondata.sprites.other.dream_world.front_default,
        name: pokemondata.name,
        height: pokemondata.height,
        weight: pokemondata.weight,
        types: pokemondata.types.map((ele) => ele.type.name),
      };
      setPokemon(pokeDetails);
      setReqInfo((x) => ({ ...x, loading: false, error: false }));
    } catch (e) {
      console.log(e);

      setReqInfo((x) => ({ ...x, loading: false, error: true }));
    }
  }

  useEffect(() => {
    downloadPokemon();
  }, []);

  return (
    <div className="pokemon-detail-wrapper">
      <img className="pokemon-image" src={pokemon.image} alt="" />
      <h1 className="pokemon-properties">
        <span>{pokemon.name}</span>
      </h1>
      <h2 className="pokemon-properties">Height:{pokemon.height}</h2>
      <h2 className="pokemon-properties">Weight:{pokemon.weight}</h2>
      <div className="pokemon-type">
        {pokemon.types &&
          pokemon.types.map((ele) => <div key={ele}>{ele}</div>)}
      </div>
      {reqInfo.loading && <>...loading Pokemon Details</>}
      {!reqInfo.loading && reqInfo.error && <>Error! Something Wrong </>}
      {!reqInfo.loading && !reqInfo.error && (
        <SimilarPokemons pokemonType={pokemon.types[0]} />
      )}
    </div>
  );
}

export default PokemonDetails;
