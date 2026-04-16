import { inject, Injectable } from "@angular/core";
import { API } from "../shared/api";
import { HttpClient } from "@angular/common/http";
import { Coords } from "../models/country";
import { Observable } from "rxjs";
import { IWeatherResponce } from "../models/map";

@Injectable({
    providedIn: "root",
})
export class MapService {
    api = inject(API);
    private http = inject(HttpClient);

    getWeather(coords: Coords): Observable<IWeatherResponce> {
        const params = {
            latitude: coords.latitude,
            longitude: coords.longitude,
            hourly: "temperature_2m",
            current: ["is_day", "snowfall", "rain"],
            forecast_days: 1,
        };
        return this.http.get<IWeatherResponce>(this.api.weather, { params });
    }
}
