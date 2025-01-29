import Search from "../Search/Search";
import "./pokedex.css";
import PokemonList from "../PokemonList/PokemonList";
import { useState } from "react";
import PokemonDetails from "../PokemonDetails/PokemonDetails";
function Pokedex() {
  const [changeInput, setChangeInput] = useState("");
  return (
    <>
      <div className="pokedex" >
        <Search updateInput={setChangeInput} />
      </div>
      {!changeInput ? <PokemonList /> : <PokemonDetails key={changeInput} pokemonName={changeInput}/>}
    </>
  );
}
export default Pokedex;
