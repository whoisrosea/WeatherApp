export interface ILocation {
  yourLocation?: boolean
  country: string;
  city: string;
  lat: number;
  lng: number;
}

export interface IWeather {
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

export interface IWeatherData {
  date: string;
  items: IWeather[];
}

interface coords {
  accuracy: number;
  altitude: null;
  altitudeAccuracy: null;
  heading: null;
  latitude: number;
  longitude: number;
  speed: null;
}

