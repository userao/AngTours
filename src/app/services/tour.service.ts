import { inject, Injectable } from "@angular/core";
import { TourApiService } from "./api/tour-api.service";

@Injectable({
    providedIn: "root",
})
export class TourService {
    private toursApi = inject(TourApiService);

    constructor() {}

    getTours() {
        return this.toursApi.getTours();
    }
}
