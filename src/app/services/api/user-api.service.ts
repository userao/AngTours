import { inject, Injectable } from "@angular/core";
import { API } from "../../shared/api";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { User } from "../../models/types";

@Injectable({
    providedIn: "root",
})
export class UserApiService {
    private api = API;
    private http = inject(HttpClient);

    constructor() {}

    auth(body: User): Observable<User> {
        return this.http.post<User>(this.api.auth, body);
    }

    register(body: User): Observable<User> {
        return this.http.post<User>(this.api.register, body);
    }
}
