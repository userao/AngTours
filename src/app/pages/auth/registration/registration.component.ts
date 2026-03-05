import { NgClass } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { Component } from "@angular/core";

@Component({
    selector: "app-registration",
    imports: [NgClass, MatButtonModule, FormsModule],
    templateUrl: "./registration.component.html",
    styleUrl: "./registration.component.scss",
})
export class RegistrationComponent {
    login: string = "";
    password: string = "";
    passwordRepeat: string = "";
    email: string = "";

    submitted: boolean = false;

    onSubmit(): void {
      this.submitted = true;
      localStorage.setItem('user', JSON.stringify({login: this.login, password: this.password}))
    }
}
