import { Component, inject, OnInit } from "@angular/core";
import { MatCardModule } from "@angular/material/card";
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { TourService } from "../../services/tour.service";
import { ITour, IToursData } from "../../models/tour";
import { TourCardComponent } from "./tour-card/tour-card.component";
import { HighlightActiveDirective } from "../../shared/directives/highlight-active.directive";
import { Router } from "@angular/router";
import { NgIf } from "@angular/common";

@Component({
    selector: "app-tours",
    imports: [MatCardModule, TourCardComponent, HighlightActiveDirective, NgIf, MatFormFieldModule, MatInputModule],
    templateUrl: "./tours.component.html",
    styleUrl: "./tours.component.scss",
})
export class ToursComponent implements OnInit {
    private tourService = inject(TourService);
    private router = inject(Router);
    allTours: ITour[];
    renderedTours: ITour[];
    ngOnInit(): void {
        this.tourService.getTours().subscribe((data: IToursData) => {
            this.allTours = data.tours;
            this.renderedTours = [...this.allTours];
        });
    }

    searchTours(e: Event): void {
        const searchValue  = ( e.target as HTMLInputElement ).value.trim();
        const regexp = new RegExp(searchValue, 'i');

        if (!searchValue) {
            this.renderedTours = [...this.allTours];
        } else {
            this.renderedTours = this.allTours.filter((tour) => regexp.test(tour.name));
        }
    }

    onEnter(e: { el: HTMLElement; index: number }): void {
        const { el } = e;
        const tourId = el.getAttribute("data-tour-id");

        if (tourId) {
            this.router.navigate([`tour/${tourId}`]);
        }
    }
}
