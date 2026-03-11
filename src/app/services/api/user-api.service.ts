import { inject, Injectable } from "@angular/core";
import { API } from "../../shared/api";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
    providedIn: "root",
})
export class UserApiService {
    private api = API;
    private http = inject(HttpClient);

    constructor() {}

    auth(body: any): Observable<any> {
        return this.http.post<any>(this.api.auth, body);
    }
}
