import React, { FC, useEffect, useState } from "react";
import TodayWeather from "./TodayWeather";
import WeekWeather from "./WeekWeather";
import DateList from "./DateList";
import { ILocation, IWeatherData } from "../Types/types";
import "./MainWeatherSection.scss"

interface MainWeatherSectionProps {
  location: ILocation;
}

export const MainWeatherSection: FC<MainWeatherSectionProps> = ({
  location,
}) => {
  const baseUrl = "https://openweathermap.org/img/wn/";
  const suffix = "@2x.png";
  const APIkey = "5ce30d049460969a90e040b63a791d64";
  const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${location.lat}&lon=${location.lng}&appid=${APIkey}&units=metric`;

  const [weather, setWeather] = useState<IWeatherData[]>([]);
  const [day, setDay] = useState<number>(0);
  const [time, setTime] = useState<number>(0)

  function groupByDays(items: any) {
    const groups = new Map();
    items.forEach((item: any) => {
      const date = new Date(item.dt * 1000);
      const dateString = date.toISOString().split("T")[0]; 
      if (!groups.has(dateString)) {
        groups.set(dateString, []);
      }
      groups.get(dateString).push(item);
    });
    return Array.from(groups, ([date, items]) => ({ date, items }));
  }

  useEffect(() => {
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((weatherData) => {
        setWeather(groupByDays(weatherData.list)); 
      })
      .catch((error) =>
        console.error(
          "There has been a problem with your fetch operation:",
          error
        )
      );
  }, [location, url]);

  // const toCelsius = (kelvin?: number): string => {
  //   if (typeof kelvin === "number") {
  //     return (kelvin - 273.15).toFixed(2);
  //   } else {
  //     return "N/A";
  //   }
  // };

  return (
    <>
      <TodayWeather
        location={location}
        weather={weather}
        day={day}
        time={time}
        baseUrl={baseUrl}
        suffix={suffix}
      />
      <DateList weather={weather} setDay={setDay} />
      <WeekWeather
        setTime={setTime}
        weather={weather}
        day={day}
        baseUrl={baseUrl}
        suffix={suffix}
      />
    </>
  );
};
