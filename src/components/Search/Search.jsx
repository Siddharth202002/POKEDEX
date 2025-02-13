import "./Search.css";
import UseDebounce from "../../hooks/DebounceHookh";
function Search({updateInput}) {  
  let debounceCallback=UseDebounce((e) => updateInput(e.target.value));
  return (
    <>
      <input
        className="search-field"
        type="text"
        placeholder="Search Pokedex..."
        onChange={(e)=>debounceCallback(e)}
      />
    </>
  );
}
export default Search;
