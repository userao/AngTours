import { Component, inject, OnInit } from "@angular/core";
import { DatePipe } from "@angular/common";
import { TourService } from "../../services/tour.service";
import { ITour } from "../../models/tour";

@Component({
    selector: "app-order",
    imports: [DatePipe],
    templateUrl: "./order.component.html",
    styleUrl: "./order.component.scss",
})
export class OrderComponent implements OnInit {
    private tourService = inject(TourService);
    tour: ITour = null;
    ngOnInit(): void {
        this.tour = this.tourService.getSavedTour();
    }
}
