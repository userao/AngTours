import { Component, inject, OnInit } from "@angular/core";
import { DatePipe, NgClass } from "@angular/common";
import { TourService } from "../../services/tour.service";
import { ITour } from "../../models/tour";
import {
    FormArray,
    FormBuilder,
    FormControl,
    FormGroup,
    FormsModule,
    ReactiveFormsModule,
    Validators,
} from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { ActivatedRoute } from "@angular/router";
import { UserService } from "../../services/user.service";
import { MatInputModule } from "@angular/material/input";

@Component({
    selector: "app-order",
    imports: [
        DatePipe,
        FormsModule,
        MatButtonModule,
        MatInputModule,
        ReactiveFormsModule,
    ],
    templateUrl: "./order.component.html",
    styleUrl: "./order.component.scss",
})
export class OrderComponent implements OnInit {
    private tourService = inject(TourService);
    private userService = inject(UserService);
    private route = inject(ActivatedRoute);
    private fb = inject(FormBuilder);
    tour: ITour = null;
    submitted = false;
    clientInfoForm = this.fb.group({
        name: ["", { validators: Validators.required }],
        email: ["", { validators: Validators.required }],
        cardNumber: ["", {
            validators: [Validators.required],
        }],
    });

    get name(): string {
        return this.clientInfoForm.getRawValue().name;
    }
    get email(): string {
        return this.clientInfoForm.getRawValue().email;
    }
    get cardNumber(): string {
        return this.clientInfoForm.getRawValue().cardNumber;
    }
    ngOnInit(): void {
        const id = this.route.snapshot.paramMap.get("id");
        this.tourService.getTour(id).subscribe((tour) => (this.tour = tour));
    }

    handleSubmit(): void {
        const username = this.userService.getUsername();
        this.tourService
            .placeOrder({
                username,
                fullName: this.name,
                email: this.email,
                cardNumber: this.cardNumber,
                tourId: this.tour.id,
            })
            .subscribe(() => {
                this.submitted = true;
            });
    }
}
