import { NgClass } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatButtonModule } from "@angular/material/button";
import { Component, inject } from "@angular/core";
import { UserApiService } from "../../../services/api/user-api.service";
import { User } from "../../../models/types";

@Component({
    selector: "app-registration",
    imports: [NgClass, MatButtonModule, FormsModule],
    templateUrl: "./registration.component.html",
    styleUrl: "./registration.component.scss",
})
export class RegistrationComponent {
    private userApiService = inject(UserApiService);
    private snackBar = inject(MatSnackBar);
    login: string = "";
    password: string = "";
    passwordRepeat: string = "";
    email: string = "";

    submitted: boolean = false;

    onSubmit(): void {
        const user: User = { login: this.login, password: this.password };
        this.userApiService.register(user).subscribe(
            () => {
                this.submitted = true;
            },
            (err) => {
                this.snackBar.open(
                    "Ошибка регистрации пользователя",
                    "Закрыть",
                );
                throw new Error(err.message);
            },
        );
    }
}
