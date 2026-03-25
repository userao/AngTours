import { inject, Injectable } from "@angular/core";
import { API } from "../../shared/api";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { ITour, IToursData } from "../../models/tour";

@Injectable({
    providedIn: "root",
})
export class TourApiService {
    private api = API;
    private http = inject(HttpClient);

    constructor() {}

    getTours(): Observable<IToursData> {
      return this.http.get<IToursData>(this.api.tours);
    //   return this.http.get("/mocks/tours.json");
    }

    getTour(id: string): Observable<ITour> {
        return this.http.get<ITour>(this.api.tour + id);
    }
}
