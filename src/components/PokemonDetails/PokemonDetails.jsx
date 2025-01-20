import "./pokemonDetails.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";


function PokemonDetails() {
  const [pokemon, setPokemon] = useState({});
  const { id } = useParams();
  async function downloadPokemon() {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const pokemondata = response.data;
    const pokeDetails = {
      image: pokemondata.sprites.other.dream_world.front_default,
      name: pokemondata.name,
      height: pokemondata.height,
      weight: pokemondata.weight,
      types: pokemondata.types.map((ele) => ele.type.name),
    };
    setPokemon(pokeDetails);
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
    </div>
  );
}


export default PokemonDetails;
