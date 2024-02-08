import React, { FC, useEffect, useState } from "react";
import { ILocation, IWeatherData } from "../types/types";
import "./TodayWeather.scss";

interface TodayWeatherProps {
  location: ILocation;
  weather: IWeatherData[];
  day: number;
  time: number;
  suffix: string;
  baseUrl: string;
}

const TodayWeather: FC<TodayWeatherProps> = ({
  location,
  weather,
  day,
  time,
  suffix,
  baseUrl,
}) => {
  const [gradient, setGradient] = useState<string>("");
  const [value, setValue] = useState<string>(" °C");

  useEffect(() => {
    const getGradientForTime = (hour: number) => {
      if (hour >= 6 && hour < 12) {
        // Утро
        return "linear-gradient(to right, #ff7e5f, #feb47b)";
      } else if (hour >= 12 && hour < 18) {
        // День
        return "linear-gradient(to right, #00c6ff, #0072ff)";
      } else if (hour >= 18 && hour < 24) {
        // Вечер
        return "linear-gradient(to right, #654ea3, #eaafc8)";
      } else {
        // Ночь
        return "linear-gradient(to right, #0f2027, #203a43, #2c5364)";
      }
    };

    const hour = weather[day]?.items[time]
      ? parseInt(
          weather[day]?.items[time]?.dt_txt.split(" ")[1].split(":")[0],
          10
        )
      : 0;
    setGradient(getGradientForTime(hour));
  }, [weather, day, time]);

  useEffect(() => {
    document.body.style.background = gradient;

    return () => {
      document.body.style.background = "";
    };
  }, [gradient]);

  return (
    <div className="TodayWeather">
      <p>
        {location.yourLocation ? (
          <>
            <h2>Your Location</h2>
          </>
        ) : (
          <>
            {location.country}, {location.city}
          </>
        )}
      </p>
      <p>{weather[day]?.items[time]?.dt_txt}</p>
      <h1>
        {Math.round(weather[day]?.items[time]?.main.temp)}
        {value}
      </h1>
      <p>
        feels like: {Math.round(weather[day]?.items[time]?.main.feels_like)}
        {value}
      </p>
      <img
        src={`${baseUrl}${weather[day]?.items[time]?.weather[0].icon}${suffix}`}
        alt=""
      />
      <div className="TodayWeather__item-info">
        <div>
          <p>
            <b>min temperature:</b> {Math.round(weather[day]?.items[time]?.main.temp_min)}
            {value}
          </p>
          <p>
            <b>max temperature:</b> {Math.round(weather[day]?.items[time]?.main.temp_max)}
            {value}
          </p>
          <p>
            <b>pressure:</b> {weather[day]?.items[time]?.main.pressure} hPa
          </p>
        </div>
        <div>
          <p>
            <b>wind deg:</b>
            {weather[day]?.items[time]?.wind.deg}
          </p>
          <p>
            <b>wind speed:</b>
            {weather[day]?.items[time]?.wind.speed}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TodayWeather;
