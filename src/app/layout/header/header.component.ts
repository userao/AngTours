import { Component } from "@angular/core";
@Component({
    selector: "app-header",
    imports: [],
    templateUrl: "./header.component.html",
    styleUrl: "./header.component.scss",
})
export class HeaderComponent {
    userName: string = localStorage.getItem("user");
}
