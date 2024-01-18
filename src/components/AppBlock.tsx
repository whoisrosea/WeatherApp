import React, { useEffect, useState } from "react";
import "./AppBlock.css";
import { Input } from "@mui/joy";
import data from "../country-data.json";


interface WeatherForecast {
  dt: number; // Время прогноза в формате Unix timestamp
  dt_txt: string; // Время прогноза в текстовом формате
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  weather: Array<{
    id: number;
    main: string;
    description: string;
    icon: string;
  }>;
  clouds: {
    all: number;
  };
  wind: {
    speed: number;
    deg: number;
    gust?: number;
  };
  rain?: {
    "3h": number;
  };
  sys: {
    pod: string;
  };
  visibility: number;
}
interface WeatherDataGroup {
  date: string;
  items: WeatherForecast[];
}

interface CountryData {
  country: string;
  city: string;
  lat: number;
  lng: number;
}

export default function AppBlock() {
  const [userInput, setUserInput] = useState<string>("");
  const [filteredData, setFilteredData] = useState<CountryData[]>([]);
  const APIkey = "5ce30d049460969a90e040b63a791d64";
  const [weather, setWeather] = useState<WeatherDataGroup[]>([]);
  const [day, setDay] = useState<number>(0);
  const [currentCountry, setCurrentCountry] = useState<CountryData>({
    country: "",
    city: "",
    lat: 0,
    lng: 0,
  });

  function getWeatherIconUrl(iconCode: string | undefined) {
    const baseUrl = "https://openweathermap.org/img/wn/";
    const suffix = "@2x.png";

    switch (iconCode) {
      case "01d":
        return `${baseUrl}01d${suffix}`;
      case "01n":
        return `${baseUrl}01n${suffix}`;
      case "02d":
        return `${baseUrl}02d${suffix}`;
      case "02n":
        return `${baseUrl}02n${suffix}`;
      case "03d":
        return `${baseUrl}03d${suffix}`;
      case "03n":
        return `${baseUrl}03n${suffix}`;
      case "04d":
        return `${baseUrl}04d${suffix}`;
      case "04n":
        return `${baseUrl}04n${suffix}`;
      case "09d":
        return `${baseUrl}09d${suffix}`;
      case "09n":
        return `${baseUrl}09n${suffix}`;
      case "10d":
        return `${baseUrl}10d${suffix}`;
      case "10n":
        return `${baseUrl}10n${suffix}`;
      case "11d":
        return `${baseUrl}11d${suffix}`;
      case "11n":
        return `${baseUrl}11n${suffix}`;
      case "13d":
        return `${baseUrl}13d${suffix}`;
      case "13n":
        return `${baseUrl}13n${suffix}`;
      case "50d":
        return `${baseUrl}50d${suffix}`;
      case "50n":
        return `${baseUrl}50n${suffix}`;
    }
  }

  const toCelsius = (kelvin?: number): string => {
    if (typeof kelvin === "number") {
      return (kelvin - 273.15).toFixed(2);
    } else {
      return "N/A";
    }
  };


  const handleUserInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value);
  };

  const handleUserChoice = (
    country: string,
    city: string,
    lat: number,
    lng: number
  ) => {
    setCurrentCountry({ country, city, lat, lng });
    console.log("OKEY SIR");
  };

  useEffect(() => {
    const searchQuery = userInput.toLowerCase();
    setFilteredData(
      data.filter((el) => {
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

  const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${currentCountry.lat}&lon=${currentCountry.lng}&appid=${APIkey}&units=metric`;

  useEffect(() => {
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((weatherData) => {
        // Предполагаем, что weatherData имеет формат, который мы видим на скриншоте
        setWeather(groupByDays(weatherData.list)); // Используйте функцию groupByDays, чтобы сгруппировать данные по дням
      })
      .catch((error) =>
        console.error(
          "There has been a problem with your fetch operation:",
          error
        )
      );
    console.log(weather);
  }, [currentCountry, url]);

  function groupByDays(items: any) {
    // Создаём Map для хранения групп
    const groups = new Map();
    items.forEach((item: any) => {
      // Преобразуем миллисекунды в объект Date, а затем в строку даты
      const date = new Date(item.dt * 1000); // dt - это предполагаемое имя поля с датой в миллисекундах
      const dateString = date.toISOString().split("T")[0]; // Получаем строку даты в формате YYYY-MM-DD
      // Если для этой даты уже есть группа, добавляем объект в массив
      if (!groups.has(dateString)) {
        groups.set(dateString, []);
      }
      groups.get(dateString).push(item);
    });
    // Преобразуем Map в массив объектов

    return Array.from(groups, ([date, items]) => ({ date, items }));
  }

  return (
    <div className="AppBlock">
      <div className="AppBlock__item AppBlock__item-left">
        <Input
          placeholder="Type in here…"
          variant="soft"
          value={userInput}
          onChange={handleUserInput}
        />
        <div className="AppBlock__item-left-text">
          {filteredData.slice(0,21).map((el, index) => (
            <h5
              key={index}
              onClick={() =>
                handleUserChoice(el.country, el.city, el.lat, el.lng)
              }
            >
              {el.country}, {el.city},
            </h5>
          ))}
        </div>
      </div>
      <div className="AppBlock__item AppBlock__item-right">
        {weather[day] && currentCountry.country ? (
          <div className="AppBlock__item-right">
            <div className="AppBlock__item-right-maininfo">
              <p>
                {currentCountry.country}, {currentCountry.city}
              </p>
              <p>{weather[day].items[0].dt_txt}</p>
              <h1>{weather[day].items[0].main.temp}</h1>
              <p>feels like: {weather[day].items[0].main.feels_like}</p>
              <img
                src={getWeatherIconUrl(weather[day].items[0].weather[0].icon)}
                alt=""
              />
              <div className="AppBlock__item-right-downinfo">
                <div>
                  <p>min temperature: {weather[day].items[0].main.temp_min}</p>
                  <p>max temperature: {weather[day].items[0].main.temp_max}</p>
                  <p>pressure: {weather[day].items[0].main.pressure}</p>
                </div>
                <div>
                  <p>wind deg:{weather[day].items[0].wind.deg}</p>
                  <p>wind speed:{weather[day].items[0].wind.speed}</p>
                </div>
              </div>
            </div>
            <div className="AppBlock__item-right-downmenu">
              {weather[day].items.map((item, i) => (
                <div className="AppBlock__item-right-downmenu-item" key={i}>
                  <p>{item.dt_txt.slice(10)}</p>
                  <h1>{item.main.temp}</h1>
                  <img src={getWeatherIconUrl(item.weather[0].icon)} alt="" />
                </div>
              ))}
            </div>
            <div className="AppBlock__item-right-weeklist">
              {weather.map((item, index) => (
                <div
                  onClick={() => setDay(index)}
                  className="AppBlock__item-right-weeklist-item"
                >
                  <h4>{item.date}</h4>
                  <h4 key={index}>
                    T:{" "}
                    {item.items.reduce((sum, cur) => sum + cur.main.temp, 0) /
                      item.items.length}
                  </h4>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <h1>CHOOSE YOUR COUNTRY</h1>
        )}
      </div>
    </div>
  );
}
