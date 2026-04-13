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
    private api = API;
    private http = inject(HttpClient);
    private loaderService = inject(LoaderService);

    constructor() {}

    getTours(): Observable<IToursData> {
        this.loaderService.setLoader(true);
        return this.http.get<IToursData>(this.api.tours).pipe(
            delay(3000),
            finalize(() => {
                this.loaderService.setLoader(false);
            }),
        );
        //   return this.http.get("/mocks/tours.json");
    }

    getTour(id: string): Observable<ITour> {
        return this.http.get<ITour>(this.api.tour + id);
    }

    getCountries(): Observable<ICountry[]> {
        this.loaderService.setLoader(true);
        return this.http.get<ICountry[]>(API.countries).pipe(
            catchError(() => of([])),
            delay(2000),
            finalize(() => {
                this.loaderService.setLoader(false);
            }),
        );
    }
}
