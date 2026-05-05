import { inject, Injectable } from "@angular/core";
import { API } from "../../shared/api";
import { HttpClient } from "@angular/common/http";
import { delay, finalize, Observable } from "rxjs";
import { IAuthUser, IAuthUserRes, IRegistrationUser } from "../../models/user";
import { LoaderService } from "../loader.service";

@Injectable({
    providedIn: "root",
})
export class UserApiService {
    private http = inject(HttpClient);
    private loaderService = inject(LoaderService);
    private api = inject(API);

    constructor() {}

    auth(body: IAuthUser): Observable<IAuthUserRes> {
        this.loaderService.setLoader(true);
        return this.http.post<IAuthUserRes>(this.api.auth, body).pipe(
            delay(1000),
            finalize(() => this.loaderService.setLoader(false)),
        );
    }

    register(body: IRegistrationUser): Observable<IRegistrationUser> {
        this.loaderService.setLoader(true);
        return this.http.post<IRegistrationUser>(this.api.register, body).pipe(
            delay(1000),
            finalize(() => this.loaderService.setLoader(false)),
        );
    }
}
