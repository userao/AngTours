import { Injectable } from "@angular/core";
import { IRegistrationUser } from "../models/user";

@Injectable({
    providedIn: "root",
})
export class UserService {
    private username: string;

    constructor() {
        this.loadUser();
    }

    loadUser() {
        const savedUsername = localStorage.getItem("username");

        if (savedUsername) {
            this.username = savedUsername;
        }
    }

    saveUsername(username: string): void {
        this.username = username;
        localStorage.setItem("username", username);
    }

    getUsername(): string {
        return this.username;
    }

    setUsername(username: string): void {
        this.username = username;
    }

    logOut() {
        this.username = null;
        localStorage.removeItem("username");
    }
}
