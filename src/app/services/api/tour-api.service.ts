import { inject, Injectable } from "@angular/core";
import { API } from "../../shared/api";
import { HttpClient } from "@angular/common/http";
import { delay, finalize, Observable } from "rxjs";
import { ITour, IToursData } from "../../models/tour";
import { LoaderService } from "../loader.service";

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
            })
        );
        //   return this.http.get("/mocks/tours.json");
    }

    getTour(id: string): Observable<ITour> {
        return this.http.get<ITour>(this.api.tour + id);
    }
}
