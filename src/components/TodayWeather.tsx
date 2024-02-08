import React, { FC, useEffect, useState } from "react";
import { ILocation, IWeatherData } from "../Types/types";
import "./TodayWeather.scss"

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
    // Применяем градиент к фону body
    document.body.style.background = gradient;

    // Очищаем эффект, возвращая предыдущий стиль при размонтировании компонента
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
            <p>{location.lat}</p>
            <p> {location.lng}</p>
          </>
        ) : (
          <>
            {location.country}, {location.city}
          </>
        )}
      </p>
      <p>{weather[day]?.items[time]?.dt_txt}</p>
      <h1>{weather[day]?.items[time]?.main.temp}</h1>
      <p>feels like: {weather[day]?.items[time]?.main.feels_like}</p>
      <img
        src={`${baseUrl}${weather[day]?.items[time]?.weather[0].icon}${suffix}`}
        alt=""
      />
      <div className="TodayWeather__item-info">
        <div>
          <p>min temperature: {weather[day]?.items[time]?.main.temp_min}</p>
          <p>max temperature: {weather[day]?.items[time]?.main.temp_max}</p>
          <p>pressure: {weather[day]?.items[time]?.main.pressure}</p>
        </div>
        <div>
          <p>wind deg:{weather[day]?.items[time]?.wind.deg}</p>
          <p>wind speed:{weather[day]?.items[time]?.wind.speed}</p>
        </div>
      </div>
    </div>
  );
};

export default TodayWeather;
