import { inject, Injectable } from "@angular/core";
import { TourApiService } from "./api/tour-api.service";
import { ITour, IToursData, TourTypes } from "../models/tour";
import {
    catchError,
    delay,
    finalize,
    forkJoin,
    map,
    Observable,
    of,
    Subject,
} from "rxjs";
import { ICountry, ICountryWeather } from "../models/country";
import { LoaderService } from "./loader.service";

@Injectable({
    providedIn: "root",
})
export class TourService {
    private toursApi = inject(TourApiService);
    private loaderService = inject(LoaderService);
    tour: ITour;
    private tourTypeSubject = new Subject<TourTypes>();
    readonly tourType$ = this.tourTypeSubject.asObservable();

    private tourDateSubject = new Subject<Date>();
    readonly tourDate$ = this.tourDateSubject.asObservable();


    constructor() {
        const tourString = localStorage.getItem("orderedTour");
        if (tourString) {
            this.tour = JSON.parse(tourString);
        }
    }

    getTours(): Observable<ITour[]> {
        const countries$ = this.toursApi.getCountries();
        const tours$ = this.toursApi.getTours();
        this.loaderService.setLoader(true);

        return forkJoin<[ICountry[], IToursData]>([countries$, tours$]).pipe(
            delay(1000),
            map((data) => {
                const [countries, { tours }] = data;
                const countriesMap = new Map();
                const toursWithCountries = [] as ITour[];

                countries.forEach((country) =>
                    countriesMap.set(country.iso_code2, country),
                );

                if (Array.isArray(tours)) {
                    tours.forEach((tour) => {
                        toursWithCountries.push({
                            ...tour,
                            country: countriesMap.get(tour.code) || null,
                        });
                    });
                }

                return toursWithCountries;
            }),
            catchError((err) => {
                console.log(err);
                return of([]);
            }),
            finalize(() => {
                this.loaderService.setLoader(false);
            })
        );
    }

    getTour(id: string) {
        return this.toursApi.getTour(id);
    }

    setTourType(type: TourTypes): void {
        this.tourTypeSubject.next(type);
    }

    setTourDate(date: Date): void {
        this.tourDateSubject.next(date);
    }

    saveTour(tour: ITour) {
        this.tour = tour;
        localStorage.setItem("orderedTour", JSON.stringify(this.tour));
    }

    getSavedTour(): ITour {
        return this.tour;
    }

    getCountryByCode(name: string, code: string): Observable<ICountryWeather> {
        return this.toursApi.getCountryByCode(name, code);
    }
}
