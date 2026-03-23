import { Component, Input } from "@angular/core";
import { ITour } from "../../../models/tour";
import { MatCardModule } from "@angular/material/card";
import { TextLimitingPipe } from "../../../pipes/text-limiting.pipe";

@Component({
    selector: "app-tour-card",
    imports: [MatCardModule, TextLimitingPipe],
    templateUrl: "./tour-card.component.html",
    styleUrl: "./tour-card.component.scss",
})
export class TourCardComponent {
    @Input() tour: ITour;
}
