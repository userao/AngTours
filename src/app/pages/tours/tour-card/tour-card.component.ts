import { Component, Input } from "@angular/core";
import { ITour } from "../../../models/tour";
import { MatCardModule } from "@angular/material/card";

@Component({
    selector: "app-tour-card",
    imports: [MatCardModule],
    templateUrl: "./tour-card.component.html",
    styleUrl: "./tour-card.component.scss",
})
export class TourCardComponent {
    @Input() tour: ITour;
}
