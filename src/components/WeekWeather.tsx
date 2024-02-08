import React, { FC, useState } from "react";
import { IWeatherData } from "../types/types";
import "./WeekWeather.scss";

interface WeekWeatherProps {
  weather: IWeatherData[];
  day: number;
  suffix: string;
  baseUrl: string;
  setTime: React.Dispatch<React.SetStateAction<number>>;
}

const WeekWeather: FC<WeekWeatherProps> = ({
  weather,
  day,
  suffix,
  baseUrl,
  setTime,
}) => {
  const [value, setValue] = useState<string>("°C");
  return (
    <div className="WeekWeather">
      {weather[day]?.items.map((item, i) => (
        <div className="WeekWeather__item" key={i} onClick={() => setTime(i)}>
          <p>{item.dt_txt.slice(10)}</p>
          <h1>{Math.round(item.main.temp)}{value}</h1>
          <img src={`${baseUrl}${item.weather[0].icon}${suffix}`} alt="" />
        </div>
      ))}
    </div>
  );
};

export default WeekWeather;
