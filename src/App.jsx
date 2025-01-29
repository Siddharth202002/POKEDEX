import "./App.css";
import CustomRoutes from "./routers/CustomRouets";
import { Link } from "react-router-dom";
function App() {
  return (

    <div className="app-wrappper">
      <div className="heading">
        
         <Link to ='/'>
         <h1 className="pokedex-heading" onClick={()=><CustomRoutes/>}>POKEDEX</h1>
        
        </Link>
       
      
      </div>
     
      <CustomRoutes />
    </div>
  );
}

export default App;
