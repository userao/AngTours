import { Component, inject, OnInit } from "@angular/core";
import { TourService } from "../../services/tour.service";

@Component({
    selector: "app-tours",
    imports: [],
    templateUrl: "./tours.component.html",
    styleUrl: "./tours.component.scss",
})
export class ToursComponent implements OnInit {
    private tourService = inject(TourService);
    ngOnInit(): void {
        this.tourService.getTours().subscribe((data) => {
            console.log("tours", data);
        });
    }
}
