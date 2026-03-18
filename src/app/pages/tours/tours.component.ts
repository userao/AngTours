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
    tours: any;
    ngOnInit(): void {
        this.tourService.getTours().subscribe((data: any) => {
            this.tours = data.tours;
        });
    }
}
