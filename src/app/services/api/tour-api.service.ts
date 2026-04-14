import { inject, Injectable } from "@angular/core";
import { API } from "../../shared/api";
import { HttpClient } from "@angular/common/http";
import { catchError, delay, finalize, Observable, of } from "rxjs";
import { ITour, IToursData } from "../../models/tour";
import { LoaderService } from "../loader.service";
import { ICountry } from "../../models/country";

@Injectable({
    providedIn: "root",
})
export class TourApiService {
    private http = inject(HttpClient);
    private loaderService = inject(LoaderService);
    private api = inject(API);

    constructor() {}

    getTours(showLoader = false): Observable<IToursData> {
        if (showLoader) {
            this.loaderService.setLoader(true);
        }
        return this.http.get<IToursData>(this.api.tours).pipe(
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
        return this.http.get<ITour>(this.api.tour + id);
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
}
