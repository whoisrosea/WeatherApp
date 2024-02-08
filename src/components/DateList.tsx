import React, { FC } from 'react'
import { IWeatherData } from '../Types/types';
import "./DateList.scss"

interface DateListProps{
  weather: IWeatherData[]
  setDay: React.Dispatch<React.SetStateAction<number>>
}

const DateList: FC<DateListProps> = ({weather, setDay}) => {
  return (
    <div className="DateList">
      {weather.map((item, index) => (
        <div
          onClick={() => setDay(index)}
          className="DateList__item"
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
  );
};

export default DateList