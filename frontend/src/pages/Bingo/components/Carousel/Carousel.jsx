import React, { useState, useEffect} from "react";
import "./styles.css";

export default function Carousel({ imagePaths, setImagePaths, usedPaths, setUsedPaths }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);

   useEffect(() => {
      const pokeAvailable = JSON.parse(localStorage.getItem("poke-available"));

      if(imagePaths.length !== 0 && pokeAvailable.length !==  imagePaths.length){ 
         localStorage.setItem("poke-available", JSON.stringify(imagePaths));
      }

   }, [imagePaths]);

   useEffect(() => {
      localStorage.setItem("poke-used", JSON.stringify(usedPaths));
   }, [usedPaths]);

  // Devuelve el índice anterior, con wrap-around
  const getPrevIndex = () => (currentIndex - 1 + imagePaths.length) % imagePaths.length;

  // Devuelve el índice siguiente, con wrap-around
  const getNextIndex = () => (currentIndex + 1) % imagePaths.length;

  // Simula la ruleta girando
   const spinRoulette = () => {
  if (isSpinning || imagePaths.length === 0) return;

  setIsSpinning(true);

  const totalImages = imagePaths.length;
  const rawSteps = (final, current) =>
    (final - current + totalImages) % totalImages;

  const finalIndex = Math.floor(Math.random() * totalImages);
  const naturalSteps = rawSteps(finalIndex, currentIndex);

  // Si los pasos naturales son < 15, dar una vuelta completa extra
  const totalSteps = naturalSteps < 25 ? naturalSteps + totalImages : naturalSteps;

  const totalDuration = 3000; // ms
  const timestamps = [];

  // Crear pesos con easing para simular desaceleración
  for (let i = 0; i < totalSteps; i++) {
    const t = i / totalSteps;
    const eased = Math.pow(t, 2); // aceleración -> desaceleración
    timestamps.push(eased);
  }

  // Normaliza los delays para que sumen 3 segundos
  const totalWeight = timestamps.reduce((sum, val) => sum + val, 0);
  const delays = timestamps.map((w) => (w / totalWeight) * totalDuration);

  console.log("Índice actual:", currentIndex);
  console.log("Índice final: ", finalIndex);
  console.log("Pasos totales: ", totalSteps);

  let step = 0;

  const spinStep = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalImages);
    step++;

    if (step < totalSteps) {
      setTimeout(spinStep, delays[step]);
    } else {
      setIsSpinning(false);
      console.log("Imagen final:", imagePaths[finalIndex]);

      const selected = imagePaths[finalIndex];
      
      const updatedUsed = [...usedPaths, selected];
      setUsedPaths(updatedUsed);

    }
  };

  spinStep();
};


const resetAll = () => {
   setImagePaths([]);
   setUsedPaths([]);
   localStorage.setItem("poke-available", JSON.stringify([]));
   localStorage.setItem("poke-used", JSON.stringify([]));
   localStorage.setItem("game-status", false);

   // f5
   window.location.reload();
}

  

  return (
    <div className="carousel">
      <div className="carousel-images">

         {
            imagePaths.length === 0 ? (
               <p>No hay imágenes disponibles</p>
            ) : (
               <>
               <img
                  src={imagePaths[getPrevIndex()]}
                  className="side-image"
                  alt="prev"
               />
               <img
                  src={imagePaths[currentIndex]}
                  className="center-image"
                  alt="current"
               />
               <img
                  src={imagePaths[getNextIndex()]}
                  className="side-image"
                  alt="next"
               />
               </>
            )
         }
        
      </div>

      <button onClick={spinRoulette} disabled={isSpinning}>
        Girar
      </button>

      <button onClick={resetAll}>
        Reset
      </button>
    </div>
  );
}
