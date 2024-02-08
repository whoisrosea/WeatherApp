import React, { FC } from "react";
import { IWeatherData } from "../types/types";
import "./DateList.scss";

interface DateListProps {
  weather: IWeatherData[];
  setDay: React.Dispatch<React.SetStateAction<number>>;
}

const DateList: FC<DateListProps> = ({ weather, setDay }) => {
  return (
    <div className="DateList">
      {weather.map((item, index) => (
        <div onClick={() => setDay(index)} className="DateList__item">
          <h4>{item.date}</h4>
          <h4 key={index}>
            
            {Math.round(
              item.items.reduce((sum, cur) => sum + cur.main.temp, 0) /
                item.items.length
            )}
            °C
          </h4>
        </div>
      ))}
    </div>
  );
};

export default DateList;
