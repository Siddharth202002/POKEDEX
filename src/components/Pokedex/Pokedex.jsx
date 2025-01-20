import Search from "../Search/Search";
import "./pokedex.css";
import PokemonList from "../PokemonList/PokemonList";
function Pokedex() {
  return (
    <>
    <div className="pokedex">
      
      <Search />
      
    </div>
    <PokemonList />
    </>
    
  );
}
export default Pokedex;
