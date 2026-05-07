import { inject, Injectable } from "@angular/core";
import { API } from "../../shared/api";
import { HttpClient } from "@angular/common/http";
import {
    catchError,
    delay,
    finalize,
    from,
    map,
    Observable,
    of,
    switchMap,
} from "rxjs";
import { ITour, ITourData } from "../../models/tour";
import { LoaderService } from "../loader.service";
import {
    Coords,
    ICountry,
    ICountryResponce,
    ICountryWeather,
} from "../../models/country";
import { MapService } from "../map.service";
import { IOrder } from "../../models/order";

@Injectable({
    providedIn: "root",
})
export class TourApiService {
    private http = inject(HttpClient);
    private loaderService = inject(LoaderService);
    private mapService = inject(MapService);
    private api = inject(API);

    constructor() {}

    getTours(showLoader = false): Observable<ITour[]> {
        if (showLoader) {
            this.loaderService.setLoader(true);
        }
        return this.http.get<ITourData[]>(this.api.tours).pipe(
            switchMap((data) => {
                const tours = data.map((data) => {
                    const { _id, ...tour } = { id: data._id, ...data };
                    return tour as ITour;
                });
                return of(tours);
            }),
            delay(2000),
            finalize(() => {
                if (showLoader) {
                    this.loaderService.setLoader(false);
                }
            }),
        );
        //   return this.http.get("/mocks/tours.json");
    }

    getTour(id: string): Observable<ITour> {
        return this.http.get<ITourData>(this.api.tour + id).pipe(
            map((data) => {
                const { _id, ...tour } = { id: data._id, ...data };
                return tour as ITour;
            }),
        );
    }

    getCountries(showLoader = false): Observable<ICountry[]> {
        if (showLoader) {
            this.loaderService.setLoader(true);
        }
        return this.http.get<ICountry[]>(this.api.countries).pipe(
            catchError(() => of([])),
            finalize(() => {
                if (showLoader) {
                    this.loaderService.setLoader(false);
                }
            }),
        );
    }

    getCountryByCode(name: string, code: string): Observable<ICountryWeather> {
        return this.http
            .get<ICountryResponce>(this.api.countryByCode, {
                params: { name, code },
            })
            .pipe(
                map((data): Coords => data.results[0]),
                switchMap((countryCoords) => {
                    return this.mapService.getWeather(countryCoords).pipe(
                        map((weatherResponce) => {
                            const { current, hourly } = weatherResponce;
                            const weatherData = {
                                isDay: current.is_day,
                                snowfall: current.snowfall,
                                rain: current.rain,
                                currentWeather: hourly.temperature_2m[15],
                            };

                            return { weatherData, countryData: countryCoords };
                        }),
                    );
                }),
            );
    }

    postOrder(order: IOrder): Observable<IOrder> {
        return this.http.post<IOrder>(this.api.orders, order);
    }
}
