import { Injectable } from "@angular/core";
import { IRegistrationUser } from "../models/user";

@Injectable({
    providedIn: "root",
})
export class UserService {
    private user: IRegistrationUser = null;

    constructor() {}

    saveLoginInStore(user: IRegistrationUser): void {
        this.setUser(user);
        localStorage.setItem("user", user.login);
    }

    getUser(): IRegistrationUser {
        return this.user;
    }

    setUser(user: IRegistrationUser): void {
        this.user = user;
    }
}
