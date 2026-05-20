import { Component, inject } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { TourService } from "../../../services/tour.service";
import { ITourUpload } from "../../../models/tour";

@Component({
    selector: "app-tour-upload",
    imports: [ReactiveFormsModule, MatInputModule, MatButtonModule],
    templateUrl: "./tour-upload.component.html",
    styleUrl: "./tour-upload.component.scss",
})
export class TourUploadComponent {
    private tourService = inject(TourService);
    tourForm = new FormGroup({
        title: new FormControl(""),
        description: new FormControl(""),
        operator: new FormControl(""),
        price: new FormControl(""),
        image: new FormControl(),
    });

    handleSubmit() {
        const formData = this.tourForm.getRawValue();
        const tour = {
            name: formData.title,
            description: formData.description,
            tourOperator: formData.operator,
            price: formData.price,
            img: formData.image,
        } as ITourUpload;

        this.tourService.uploadTour(tour).subscribe((data) => {
            console.log(data);
        });
    }
}
