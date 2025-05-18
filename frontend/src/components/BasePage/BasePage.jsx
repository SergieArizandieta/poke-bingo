import "./styles.css"

import { Outlet, Link } from "react-router-dom";
import banner from "../../assets/imgs/banner/Logo.png";

export default function BasePage() {

  return (
      <section className="container">
         <nav className="header">
            <img src={banner} alt="Pokémon Fanpage" className="logo" />
            <ul className="nav-links">
               <li><Link to="/">Inicio</Link></li>
               <li><Link to="/pokedex">Pokédex</Link></li>
               <li><Link to="/foro">Foro</Link></li>
               <li><Link to="/eventos">Eventos</Link></li>
               <li><Link to="/tienda">Tienda</Link></li>
            </ul>
         </nav>


         <main><Outlet/></main>
         <br />
      </section>
  )
}