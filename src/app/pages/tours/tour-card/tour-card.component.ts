import { Component, Input } from "@angular/core";
import { ITour } from "../../../models/tour";
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";

@Component({
    selector: "app-tour-card",
    imports: [MatCardModule, MatButtonModule],
    templateUrl: "./tour-card.component.html",
    styleUrl: "./tour-card.component.scss",
})
export class TourCardComponent {
    @Input() tour: ITour;
}
