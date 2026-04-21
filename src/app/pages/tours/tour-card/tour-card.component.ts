import { Component, inject, Input, OnInit } from "@angular/core";
import { ITour } from "../../../models/tour";
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import { Router } from "@angular/router";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { TourService } from "../../../services/tour.service";
import { NgClass } from "@angular/common";
import { MatIconModule } from "@angular/material/icon";

@Component({
    selector: "app-tour-card",
    imports: [MatCardModule, MatButtonModule, FontAwesomeModule, NgClass, MatIconModule],
    templateUrl: "./tour-card.component.html",
    styleUrl: "./tour-card.component.scss",
    host: {
        "[attr.data-tour-id]": "tour.id",
    },
})
export class TourCardComponent implements OnInit {
    private router = inject(Router);
    private tourService = inject(TourService);
    @Input() tour: ITour;
    @Input() handleShowModal: (e: Event, tour: ITour, code: string) => void;
    cart = faCartShopping;

    ngOnInit(): void {
        if(this.tour.inBasket === undefined) {
            this.tour.inBasket = false;
        }
    }

    goToTour(): void {
        this.router.navigate([`tour/${this.tour.id}`]);
    }

    handleCart(): void {
        if (this.tour.inBasket) {
            this.tourService.removeTourFromCart(this.tour);
        } else {
            this.tourService.addTourToCart(this.tour);
        }
    }
}
