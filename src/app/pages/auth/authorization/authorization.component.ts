import { NgClass } from "@angular/common";
import { Component } from "@angular/core";
import {
    FormControl,
    FormGroup,
    FormGroupDirective,
    ReactiveFormsModule,
    Validators,
} from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";

@Component({
    selector: "app-authorization",
    imports: [ReactiveFormsModule, NgClass, MatButtonModule],
    templateUrl: "./authorization.component.html",
    styleUrl: "./authorization.component.scss",
})
export class AuthorizationComponent {
    authorizationForm: FormGroup = new FormGroup({
        login: new FormControl("", [
            Validators.required,
            Validators.minLength(3),
        ]),
        password: new FormControl("", [
            Validators.required,
            Validators.minLength(6),
        ]),
    });

    submitted: boolean = false;

    get login() {
        return this.authorizationForm.get("login");
    }
    get password() {
        return this.authorizationForm.get("password");
    }

    onSubmit(): void {
        interface FormErr {
            [key: string]: boolean;
        }

        interface FormErrMsg {
            [key: string]: string;
        }

        const registredUser = JSON.parse(localStorage.getItem("user"));

        const err: FormErr = {
            notRegistred:
                !registredUser || registredUser.login !== this.login.value,
            invalidPass: registredUser.password !== this.password.value,
        };
        const errMsg: FormErrMsg = {
            notRegistred: "Такой пользователь не зарегистрирован",
            invalidPass: "Неверный пароль",
        };

        for (let key in err) {
            if (err[key] === true) {
                alert(errMsg[key]);
                return;
            }
        }

        this.submitted = true;
    }
}
