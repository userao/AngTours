export interface ICountry {
    flag_url: string;
    name_ru: string;
    iso_code2: string;
    iso_code3: string;
    name_en?: string;
}

export interface ICountryResponce {
    results: Coords[]; 
}

export type Coords = {
    latitude: number;
    longitude: number;
};

export interface IWeatherData {
    isDay: number;
    snowfall: number;
    rain: number;
    currentWeather: number;
}

export interface ICountryWeather {
    countryData: Coords;
    weatherData: IWeatherData;
}
