import { Component, inject, Input } from "@angular/core";
import { ITour } from "../../../models/tour";
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import { Router } from "@angular/router";

@Component({
    selector: "app-tour-card",
    imports: [MatCardModule, MatButtonModule],
    templateUrl: "./tour-card.component.html",
    styleUrl: "./tour-card.component.scss",
    host: {
        '[attr.data-tour-id]': 'tour.id',
    }
})
export class TourCardComponent {
    private router = inject(Router);
    @Input() tour: ITour;
    @Input() handleShowModal: (e: Event, tour: ITour, code: string) => void;

    goToTour(): void {
        this.router.navigate([`tour/${this.tour.id}`]);
    }
}
