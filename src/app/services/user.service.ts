import { Injectable } from "@angular/core";
import { IAuthUserRes } from "../models/user";

@Injectable({
    providedIn: "root",
})
export class UserService {
    private username: string;
    private user: IAuthUserRes;

    constructor() {
        this.loadUser();
    }

    setToken(token: string): void {
        localStorage.setItem("token", token);
    }

    setUser(user: IAuthUserRes) {
        this.user = user;
        localStorage.setItem('user', JSON.stringify(this.user));
    }

    getUser() {
        return this.user;
    }

    loadUser() {
        const savedUser = localStorage.getItem("user");

        if (savedUser) {
            this.user = JSON.parse(savedUser);
        }
    }

    logOut() {
        this.user = null;
        localStorage.removeItem("user");
        localStorage.removeItem("token");
    }
}
