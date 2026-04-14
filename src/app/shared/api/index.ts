import { InjectionToken } from "@angular/core";
import { environment } from "../../../environments/environment";
import { IConfig } from "../../models/config";

const apiData: IConfig = {
    auth: `${environment.server}/auth`,
    register: `${environment.server}/register`,
    tours: `${environment.server}/tours`,
    tour: `${environment.server}/tour/`,
    countries: `${environment.server}/countries`,
} as const;

export const API = new InjectionToken<IConfig>('app.config', {
    factory: () => apiData,
})