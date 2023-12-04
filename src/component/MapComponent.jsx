import React, { useEffect } from "react";
import tt from "@tomtom-international/web-sdk-maps";

const MapComponent = () => {
  const apiKey = process.env.REACT_APP_API_KEY;

  useEffect(() => {
    const map = tt.map({
      key: apiKey,
      container: "map",
      // center: [longitude, latitude], // Specifica la longitudine e la latitudine del centro della mappa
      zoom: 15, // Imposta il livello di zoom iniziale
    });

    // Aggiungi altri componenti o layer alla mappa secondo le tue esigenze
    // Esempio: Aggiungi un marker alla mappa
    // const marker = new tt.Marker().setLngLat([longitude, latitude]).addTo(map);

    // Pulisci la mappa quando il componente viene smontato
    return () => {
      map.remove();
    };
  }, []); // Assicurati che l'effetto venga eseguito solo una volta

  return (
    <div>
      <div id="map" style={{ width: "100%", height: "100%" }}></div>
    </div>
  );
};

export default MapComponent;
