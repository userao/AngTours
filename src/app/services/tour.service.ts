import { inject, Injectable } from "@angular/core";
import { TourApiService } from "./api/tour-api.service";
import { ITour } from "../models/tour";

@Injectable({
    providedIn: "root",
})
export class TourService {
    private toursApi = inject(TourApiService);
    tour: ITour;

    constructor() {
        const tourString = localStorage.getItem('orderedTour');
        if(tourString) {
            this.tour = JSON.parse(tourString);
        }
    }

    getTours() {
        return this.toursApi.getTours();
    }

    getTour(id: string) {
        return this.toursApi.getTour(id);
    }

    saveTour(tour: ITour) {
        this.tour = tour;
        localStorage.setItem("orderedTour", JSON.stringify(this.tour));
    }

    getSavedTour(): ITour {
        return this.tour;
    }
}
