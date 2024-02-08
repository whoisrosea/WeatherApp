import React, { useEffect, useState } from "react";
import "./App.css";
import LocationSearch from "./components/LocationSearch";
import { MainWeatherSection } from "./components/MainWeatherSection";
import { ILocation } from "./Types/types";
import { CircularProgress } from "@mui/joy";

function App() {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [location, setLocation] = useState<ILocation>({
    country: "",
    city: "",
    lat: 0,
    lng: 0,
  });


  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser");
      return;
    }
    navigator.geolocation.getCurrentPosition((position) => {
      setLocation({...location, lat:position.coords.latitude, lng: position.coords.longitude, yourLocation: true,})
      setIsLoading(false)
    });

  }, []);

  const handleUserChoice = (
    country: string,
    city: string,
    lat: number,
    lng: number
  ) => {
    setLocation({ country, city, lat, lng });
  };

  return (
    <>
      <div className="App">
          <LocationSearch handleChoice={handleUserChoice} />
          {isLoading ? 
          (<CircularProgress/>) :
          error ? 
          (<h1>{error}</h1>) :
          <MainWeatherSection location={location} />}
        </div>
    </>
  );
}

export default App;
