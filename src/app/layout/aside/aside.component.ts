import { Component, inject } from "@angular/core";
import {
    MatFormField,
    MatSelectChange,
    MatSelectModule,
} from "@angular/material/select";
import { TourTypes, IFilterTypeLogic } from "../../models/tour";
import { TourService } from "../../services/tour.service";
import {
    MatDatepickerInputEvent,
    MatDatepickerModule,
} from "@angular/material/datepicker";
import { MatInputModule } from "@angular/material/input";

@Component({
    selector: "app-aside",
    imports: [
        MatSelectModule,
        MatFormField,
        MatDatepickerModule,
        MatInputModule,
    ],
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
        this.tourService.setTourType(e.value);
    }

    handleDateSelect(e: MatDatepickerInputEvent<Date>): void {
        this.tourService.setTourDate(e.value);
    }
}
