import { inject, Injectable } from "@angular/core";
import { API } from "../../shared/api";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { IAuthUser, IRegistrationUser } from "../../models/user";

@Injectable({
    providedIn: "root",
})
export class UserApiService {
    private api = API;
    private http = inject(HttpClient);

    constructor() {}

    auth(body: IAuthUser): Observable<IAuthUser> {
        return this.http.post<IAuthUser>(this.api.auth, body);
    }

    register(body: IRegistrationUser): Observable<IRegistrationUser> {
        return this.http.post<IRegistrationUser>(this.api.register, body);
    }
}
