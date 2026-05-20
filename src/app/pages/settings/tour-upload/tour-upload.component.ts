import { Component } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";

@Component({
    selector: "app-tour-upload",
    imports: [ReactiveFormsModule, MatInputModule, MatButtonModule],
    templateUrl: "./tour-upload.component.html",
    styleUrl: "./tour-upload.component.scss",
})
export class TourUploadComponent {
    tourForm = new FormGroup({
        title: new FormControl(""),
        description: new FormControl(""),
        operator: new FormControl(""),
        price: new FormControl(""),
        date: new FormControl(""),
        image: new FormControl(),
    });

    handleSubmit() {}
}
