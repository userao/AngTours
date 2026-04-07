import { Component, inject } from "@angular/core";
import { MatFormField, MatSelectChange, MatSelectModule } from "@angular/material/select";
import { TourTypes, IFilterTypeLogic } from "../../models/tour";
import { TourService } from "../../services/tour.service";

@Component({
    selector: "app-aside",
    imports: [MatSelectModule, MatFormField],
    templateUrl: "./aside.component.html",
    styleUrl: "./aside.component.scss",
})
export class AsideComponent {
    selectedType: TourTypes = "all";
    tourService = inject(TourService);
    tourTypes: IFilterTypeLogic[] = [
        { key: "all", label: "Все" },
        { key: "single", label: "Одиночный" },
        { key: "group", label: "Групповой" },
    ];

    changeTourType(e: MatSelectChange): void {
      console.log(e.value);
      
    }
}
