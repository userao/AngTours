import { AsyncPipe, NgClass } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatButtonModule } from "@angular/material/button";
import { Component, inject } from "@angular/core";
import { UserApiService } from "../../../services/api/user-api.service";
import { IRegistrationUser } from "../../../models/user";
import { LoaderComponent } from "../../../shared/components/loader/loader.component";
import { LoaderService } from "../../../services/loader.service";

@Component({
    selector: "app-registration",
    imports: [NgClass, MatButtonModule, FormsModule, LoaderComponent, AsyncPipe],
    templateUrl: "./registration.component.html",
    styleUrl: "./registration.component.scss",
})
export class RegistrationComponent {
    private userApiService = inject(UserApiService);
    private snackBar = inject(MatSnackBar);
    loaderService = inject(LoaderService)
    login: string = "";
    password: string = "";
    passwordRepeat: string = "";
    email: string = "";
    formStatus: "idle" | "submitting" | "success" | "error" = "idle";

    submitted: boolean = false;

    onSubmit(): void {
        const user: IRegistrationUser = { login: this.login, password: this.password, email: this.email };
        this.formStatus = "submitting";
        this.userApiService.register(user).subscribe(
            () => {
                this.formStatus = "success";
                this.submitted = true;
                this.snackBar.open("Пользователь зарегистрирован", "Закрыть");
            },
            (err) => {
                this.snackBar.open(
                    "Ошибка регистрации пользователя",
                    "Закрыть",
                );
                this.submitted = false;
                this.formStatus = "error";
                throw new Error(err.message);
            },
        );
    }
}
