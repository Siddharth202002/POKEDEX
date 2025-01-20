import { Link } from "react-router-dom";

function Pokemon({ name, image, id }) {
  return (
    <div>
      <Link to={`/pokemondetails/${id}`}>
        <div>{name}</div>
        <div>
          <img src={image} height="200px" width="200px" alt="" />
        </div>
      </Link>
    </div>
  );
}
export default Pokemon;
