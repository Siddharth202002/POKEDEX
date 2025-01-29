import "./Search.css";
function Search({updateInput}) {  
  return (
    <>
      <input
        className="search-field"
        type="text"
        placeholder="Search Pokedex..."
        onChange={(e) => updateInput(e.target.value)}
      />
    </>
  );
}
export default Search;
