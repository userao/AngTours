import { Injectable } from "@angular/core";

@Injectable({
    providedIn: "root",
})
export class UserService {
    private user: any;

    constructor() {}

    saveUserInStore(user: any): void {
        this.setUser(user);
        localStorage.setItem("user", JSON.stringify(user));
    }

    getUser(): any {}

    setUser(user: any): void {
        this.user = user;
    }
}
