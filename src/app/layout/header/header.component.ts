import { Component, inject, NgZone, OnInit } from "@angular/core";
import { DatePipe } from "@angular/common";
import { UserService } from "../../services/user.service";
import { MenuComponent } from "./menu/menu.component";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { Router } from "@angular/router";
import { TourService } from "../../services/tour.service";
import {MatBadgeModule} from '@angular/material/badge';
@Component({
    selector: "app-header",
    imports: [DatePipe, MenuComponent, MatButtonModule, MatIconModule, MatBadgeModule],
    templateUrl: "./header.component.html",
    styleUrl: "./header.component.scss",
})
export class HeaderComponent implements OnInit {
    private router = inject(Router);
    private userService = inject(UserService);
    private ngZone = inject(NgZone);
    private tourService = inject(TourService);
    cartItemsLength: number;

    userName: string = null;
    date = new Date();
    menuItems = [
        { route: "", title: "главная" },
        { route: "settings", title: "настройки" },
    ];
    ngOnInit(): void {
        this.cartItemsLength = this.tourService.cart.length

        this.tourService.cartItems$.subscribe((cartItems) => {
            this.cartItemsLength = cartItems.length;
        })

        this.ngZone.runOutsideAngular(() =>
            setInterval(() => {
                this.date = new Date();
            }, 1000),
        );

        const username = this.userService.getUsername();

        if (username) {
            this.userName = username;
        } else {
            this.menuItems.push({ route: "auth", title: "Войти" });
        }
    }
    handleLogout(): void {
        this.userService.logOut();
        this.router.navigate(["/auth"]);
    }
    handleLogin(): void {
        this.router.navigate(["/auth"]);
    }
}
