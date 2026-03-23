import { Component, Input } from "@angular/core";
import { ITour } from "../../../models/tour";
import { MatCardModule } from "@angular/material/card";
<<<<<<< HEAD
import { MatButtonModule } from "@angular/material/button";

@Component({
    selector: "app-tour-card",
    imports: [MatCardModule, MatButtonModule],
=======
import { TextLimitingPipe } from "../../../pipes/text-limiting.pipe";

@Component({
    selector: "app-tour-card",
    imports: [MatCardModule, TextLimitingPipe],
>>>>>>> 6c1e66b (changed tour cards styling)
    templateUrl: "./tour-card.component.html",
    styleUrl: "./tour-card.component.scss",
})
export class TourCardComponent {
    @Input() tour: ITour;
}
