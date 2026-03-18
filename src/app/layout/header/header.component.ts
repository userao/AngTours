import { Component, inject, OnInit } from "@angular/core";
import { DatePipe } from "@angular/common";
import { UserService } from "../../services/user.service";
import { MenuComponent } from "./menu/menu.component";
@Component({
    selector: "app-header",
    imports: [DatePipe, MenuComponent],
    templateUrl: "./header.component.html",
    styleUrl: "./header.component.scss",
})
export class HeaderComponent implements OnInit {
    userService = inject(UserService);
    userName: string = null;
    date = new Date();
    menuItems = [{ route: "auth", title: "авторизация" }];
    ngOnInit(): void {
        setInterval(() => {
            this.date = new Date();
        }, 1000);

        const authUser = this.userService.getUser();

        if (authUser) {
            this.userName = authUser.login;
        }
    }
}
