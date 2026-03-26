import { Component, inject, OnInit } from "@angular/core";
import { DatePipe, NgClass } from "@angular/common";
import { TourService } from "../../services/tour.service";
import { ITour } from "../../models/tour";
import { FormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";


@Component({
    selector: "app-order",
    imports: [DatePipe, FormsModule, MatButtonModule, NgClass],
    templateUrl: "./order.component.html",
    styleUrl: "./order.component.scss",
})
export class OrderComponent implements OnInit {
    private tourService = inject(TourService);
    tour: ITour = null;
    submitted = false;
    name: string = '';
    email: string = '';

    ngOnInit(): void {
        this.tour = this.tourService.getSavedTour();
    }
    handleSubmit(): void {
        this.submitted = true;
        console.log(`Тур ${this.tour.name} забронирован!`);
    }
}
