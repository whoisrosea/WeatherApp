import { Input } from "@mui/joy";
import React, { FC, useEffect, useState } from "react";
import countryData from "../country-data.json";
import { ILocation } from "../types/types";
import "./LocationSearch.scss";

interface LocationSearchProps {
  handleChoice: (
    country: string,
    city: string,
    lat: number,
    lng: number
  ) => void;
}

const LocationSearch: FC<LocationSearchProps> = ({ handleChoice }) => {
  const [filteredData, setFilteredData] = useState<ILocation[]>([]);
  const [userInput, setUserInput] = useState<string>("");

  const handleUserInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value);
  };
  useEffect(() => {
    const searchQuery = userInput.toLowerCase();

    setFilteredData(
      countryData.filter((el) => {
        return (
          el.country.toLowerCase().includes(searchQuery) ||
          el.city.toLowerCase().includes(searchQuery) ||
          `${el.country.toLowerCase()} ${el.city.toLowerCase()}`.includes(
            searchQuery
          ) ||
          `${el.city.toLowerCase()} ${el.country.toLowerCase()}`.includes(
            searchQuery
          )
        );
      })
    );
  }, [userInput]);

  return (
    <div className="LocationSearch">
      <Input
        placeholder="Type in here…"
        value={userInput}
        onChange={handleUserInput}
      />
      <div className="LocationSearch__item">
        {filteredData.slice(0, 11).map((el, index) => (
          <h4
            key={index}
            onClick={() => handleChoice(el.country, el.city, el.lat, el.lng)}
          >
            {el.country}, {el.city},
          </h4>
        ))}
      </div>
    </div>
  );
};

export default LocationSearch;
