import { Component, inject, OnInit } from "@angular/core";
import {MatCardModule} from '@angular/material/card';
import { TourService } from "../../services/tour.service";
import { ITour, IToursData } from "../../models/tour";
import { TourCardComponent } from "./tour-card/tour-card.component";
import { Router } from "@angular/router";

@Component({
    selector: "app-tours",
    imports: [MatCardModule, TourCardComponent],
    templateUrl: "./tours.component.html",
    styleUrl: "./tours.component.scss",
})
export class ToursComponent implements OnInit {
    private tourService = inject(TourService);
    tours: ITour[];
    ngOnInit(): void {
        this.tourService.getTours().subscribe((data: IToursData) => {
            this.tours = data.tours;
        });
    }
}
