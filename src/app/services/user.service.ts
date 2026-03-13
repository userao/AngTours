import { Injectable } from "@angular/core";
import { User } from "../models/types";

@Injectable({
    providedIn: "root",
})
export class UserService {
    private user: User;

    constructor() {}

    saveLoginInStore(user: User): void {
        this.setUser(user);
        localStorage.setItem("user", user.login);
    }

    getUser(): User {
        return this.user;
    }

    setUser(user: User): void {
        this.user = user;
    }
}
