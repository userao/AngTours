import { AsyncPipe, NgClass } from "@angular/common";
import { Component, inject, OnDestroy, OnInit } from "@angular/core";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatSnackBar } from "@angular/material/snack-bar";
import {
    FormControl,
    FormGroup,
    ReactiveFormsModule,
    Validators,
} from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { IAuthUser } from "../../../models/user";
import { UserService } from "../../../services/user.service";
import { UserApiService } from "../../../services/api/user-api.service";
import { Router } from "@angular/router";
import { LoaderComponent } from "../../../shared/components/loader/loader.component";
import { LoaderService } from "../../../services/loader.service";

@Component({
    selector: "app-authorization",
    imports: [ReactiveFormsModule, NgClass, MatButtonModule, MatCheckboxModule, LoaderComponent, AsyncPipe],
    templateUrl: "./authorization.component.html",
    styleUrl: "./authorization.component.scss",
})
export class AuthorizationComponent implements OnInit, OnDestroy {
    private snackBar = inject(MatSnackBar);
    private userService = inject(UserService);
    private userApiService = inject(UserApiService);
    private router = inject(Router);
    loaderService = inject(LoaderService);
    authorizationForm: FormGroup = new FormGroup({
        login: new FormControl("", [
            Validators.required,
            Validators.minLength(3),
        ]),
        password: new FormControl("", [
            Validators.required,
            Validators.minLength(6),
        ]),
        saveInStore: new FormControl(false),
    });

    submitted: boolean = false;

    constructor() {}

    get saveInStore() {
        return this.authorizationForm.get("saveInStore");
    }

    get login() {
        return this.authorizationForm.get("login");
    }
    get password() {
        return this.authorizationForm.get("password");
    }

    ngOnInit(): void {
        console.log("authorization init");
    }

    ngOnDestroy(): void {
        console.log("authorization destroy");
    }

    onSubmit(): void {
        const user: IAuthUser = {
            login: this.login.value,
            password: this.password.value,
        };
        this.submitted = true;
        this.userApiService.auth(user).subscribe(
            () => {
                if (this.saveInStore.value) {
                    this.userService.saveUsername(user.login);
                } else {
                    this.userService.setUsername(user.login);
                }
                
                this.router.navigate(["/"]);
            },
            (err) => {
                this.snackBar.open("Ошибка авторизации", "Закрыть");
                this.submitted = false;
                throw new Error(err.message);
            },
        );
    }
}
