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
        const formValues = this.tourForm.getRawValue();
        const formData = new FormData();
        const tour: ITourUpload = {
            name: formValues.title,
            description: formValues.description,
            tourOperator: formValues.operator,
            price: formValues.price,
            img: formValues.image,
        };

        for(let key in tour) {
            formData.append(key, tour[key as keyof ITourUpload])
        }
        
        this.tourService.uploadTour(formData).subscribe((data) => {
            console.log(data);
        });
    }

    onFileSelect(e: any) {
        if (e.target.files.length > 0) {
            this.tourForm.patchValue({image: e.target.files[0]})
        }
    }
}
