import React, { useState, useRef, useEffect } from "react";
import tt from "@tomtom-international/web-sdk-maps";
import "@tomtom-international/web-sdk-maps/dist/maps.css";
import { InputGroup, FormControl, Button } from "react-bootstrap";
import FuzzySearch from "fuzzy-search";
const MapComponent = () => {
  const mapElement = useRef();
  const [map, setMap] = useState({});
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    let mapInstance = tt.map({
      key: "Xm0Kg03x0jAJxTCOmt1lnh4MBI23E1bp",
      container: mapElement.current,
      center: [0, 0],
      zoom: 1,
    });
    setMap(mapInstance);
    return () => mapInstance.remove();
  }, []);

  const handleSearch = async () => {
    try {
      const response = await tt.services
        .fuzzySearch({
          key: "Xm0Kg03x0jAJxTCOmt1lnh4MBI23E1bp",
          query: searchQuery,
        })
        .go();

      setSearchResults(response.results);
      if (response.results.length > 0) {
        const { position } = response.results[0];

        // Verifica che la mappa sia definita prima di accedere alle sue proprietà
        if (map && map.setCenter && map.setZoom) {
          map.setCenter(position);
          map.setZoom(12);
        }
      }
    } catch (error) {
      console.error("Error during search:", error);
    }
  };

  return (
    <div>
      <InputGroup className="mb-3">
        <FormControl
          placeholder="Search city..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Button variant="primary" onClick={handleSearch}>
          Search
        </Button>
      </InputGroup>

      <div ref={mapElement} style={{ width: "100%", height: "400px" }}></div>

      <div>
        <h4>Search Results:</h4>
        <ul>
          {searchResults.map((result) => (
            <li key={result.id}>{result.address.freeformAddress}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MapComponent;
