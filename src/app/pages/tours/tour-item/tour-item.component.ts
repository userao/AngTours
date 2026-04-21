import { Component, inject, OnInit } from "@angular/core";
import { ITour } from "../../../models/tour";
import { TourService } from "../../../services/tour.service";
import { ActivatedRoute, Router } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Observer } from "rxjs";
import { DatePipe } from "@angular/common";
import { MatButtonModule } from "@angular/material/button";

@Component({
    selector: "app-tour-item",
    imports: [DatePipe, MatButtonModule],
    templateUrl: "./tour-item.component.html",
    styleUrl: "./tour-item.component.scss",
})
export class TourItemComponent implements OnInit {
    private route = inject(ActivatedRoute);
    private router = inject(Router);
    private tourService = inject(TourService);
    private snackBar = inject(MatSnackBar);
    tour: ITour = null;

    ngOnInit(): void {
        const id = this.route.snapshot.paramMap.get("id");

        const observer: Partial<Observer<ITour>> = {
            next: (tour: ITour) => {
                this.tour = tour;
                error: () => {
                    this.snackBar.open("Ошибка запроса тура", "Закрыть");
                };
            },
        };

        this.tourService.getTour(id).subscribe(observer);
    }

    handleOrder(): void {
        this.router.navigate([`order/${this.tour.id}`]);
    }
}
