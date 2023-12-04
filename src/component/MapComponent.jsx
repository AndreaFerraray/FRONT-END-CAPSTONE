import React, { useEffect, useRef, useState } from "react";
import "@tomtom-international/web-sdk-maps/dist/maps.css";
import { InputGroup } from "react-bootstrap";
import tt from "@tomtom-international/web-sdk-maps";

const MapComponent = () => {
  const mapElement = useRef();
  const MAX_ZOOM = 18;

  const [mapLongitude, setMapLongitude] = useState(-121.91599);
  const [mapLatitude, setMapLatitude] = useState(37.36765);
  const [mapZoom, setMapZoom] = useState(13);
  const [map, setMap] = useState({});

  const increaseZoom = () => {
    if (mapZoom < MAX_ZOOM) {
      setMapZoom(mapZoom + 1);
    }
  };

  const decreaseZoom = () => {
    if (mapZoom > 1) {
      setMapZoom(mapZoom - 1);
    }
  };

  const updateMap = () => {
    map.setCenter([parseFloat(mapLongitude), parseFloat(mapLatitude)]);
    map.setZoom(mapZoom);
  };

  useEffect(() => {
    let map = tt.map({
      key: "Xm0Kg03x0jAJxTCOmt1lnh4MBI23E1bp", // Utilizza la chiave API corretta
      container: mapElement.current,
      center: [mapLongitude, mapLatitude],
      zoom: mapZoom,
    });
    setMap(map);

    // Pulizia della mappa quando il componente viene smontato
    return () => map.remove();
  }, [mapLatitude, mapLongitude, mapZoom]);

  return (
    <div>
      <InputGroup type="text" name="longitude" value={mapLongitude} onChange={(e) => setMapLongitude(e.target.value)} />
      <div ref={mapElement} className="mapDiv" style={{ width: "100%", height: "400px" }}></div>
    </div>
  );
};

export default MapComponent;
