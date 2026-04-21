import { Component, inject, OnInit } from "@angular/core";
import { DatePipe, NgClass } from "@angular/common";
import { TourService } from "../../services/tour.service";
import { ITour } from "../../models/tour";
import { FormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { ActivatedRoute } from "@angular/router";


@Component({
    selector: "app-order",
    imports: [DatePipe, FormsModule, MatButtonModule, NgClass],
    templateUrl: "./order.component.html",
    styleUrl: "./order.component.scss",
})
export class OrderComponent implements OnInit {
    private tourService = inject(TourService);
    private route = inject(ActivatedRoute);
    tour: ITour = null;
    submitted = false;
    name: string = '';
    email: string = '';

    ngOnInit(): void {
        const id = this.route.snapshot.paramMap.get("id");
        this.tourService.getTour(id).subscribe((tour) => this.tour = tour);
    }
    handleSubmit(): void {
        this.submitted = true;
        console.log(`Тур ${this.tour.name} забронирован!`);
    }
}
