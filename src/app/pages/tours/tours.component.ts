import { Component, inject, OnInit } from "@angular/core";
import { MatCardModule } from "@angular/material/card";
import { TourService } from "../../services/tour.service";
import { ITour, IToursData } from "../../models/tour";
import { TourCardComponent } from "./tour-card/tour-card.component";
import { HighlightActiveDirective } from "../../shared/directives/highlight-active.directive";
import { Router } from "@angular/router";

@Component({
    selector: "app-tours",
    imports: [MatCardModule, TourCardComponent, HighlightActiveDirective],
    templateUrl: "./tours.component.html",
    styleUrl: "./tours.component.scss",
})
export class ToursComponent implements OnInit {
    private tourService = inject(TourService);
    private router = inject(Router);
    tours: ITour[];
    ngOnInit(): void {
        this.tourService.getTours().subscribe((data: IToursData) => {
            this.tours = data.tours;
        });
    }

    onEnter(e: { el: HTMLElement; index: number }): void {
        const { el } = e;
        const tourId = el.getAttribute("data-tour-id");

        if (tourId) {
            this.router.navigate([`tour/${tourId}`]);
        }
    }
}
