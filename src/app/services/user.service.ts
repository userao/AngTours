import { Injectable } from "@angular/core";
import { User } from "../models/types";

@Injectable({
    providedIn: "root",
})
export class UserService {
    private user: User;

    constructor() {}

    saveUserInStore(user: User): void {
        this.setUser(user);
        localStorage.setItem("user", JSON.stringify(user));
    }

    getUser(): any {}

    setUser(user: User): void {
        this.user = user;
    }
}
