// frontend/src/pages/Bingo/Bingo.jsx
import { useState, useEffect } from "react";
import "./styles.css";
import Carousel from "./components/Carousel/Carousel";

// Carga dinámica de todas las imágenes de la carpeta
const images = import.meta.glob('../../assets/imgs/pokemon/*.png', { eager: true });

export default function Bingo() {
  const [imagePaths, setImagePaths] = useState([]);
  const [usedPaths, setUsedPaths] = useState([]);


  useEffect(() => {
      const gameStatus = localStorage.getItem("game-status");

      if(gameStatus === "true" ){
         const paths = JSON.parse(localStorage.getItem("poke-available"));
         setImagePaths(paths);
         console.log("Imágenes de Pokémon cargadas desde el almacenamiento local, cantidad: ", paths.length);
         return;
      }

      const paths = Object.values(images).map((mod) => mod.default);
      setImagePaths(paths);
      console.log("Cargando imágenes de Pokémon... Cantidad: ", paths.length);
      
      localStorage.setItem("poke-available", JSON.stringify(paths));
      localStorage.setItem("poke-used", JSON.stringify([]));
      localStorage.setItem("game-status", true);
  }, []);

  return (
    <div>
         <h1>Poke-Bingo</h1>
         <Carousel imagePaths={imagePaths} setImagePaths={setImagePaths} usedPaths={usedPaths} setUsedPaths={setUsedPaths} />

           <br/>
            <h2>Pokémon Usados</h2>
            
         <div style={{ display: "grid", gridTemplateColumns: "repeat(10, 1fr)", gap: "10px" }}>
          
        {usedPaths.map((src, idx) => (
          <img key={idx} src={src} alt={`Pokemon ${idx}`} width="96" height="96" />
        ))}
      </div>
    </div>
  );
}
