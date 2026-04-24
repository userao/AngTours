import { InjectionToken } from "@angular/core";
import { environment } from "../../../environments/environment";
import { IConfig } from "../../models/config";

const apiData: IConfig = {
    auth: `${environment.server}/auth`,
    register: `${environment.server}/register`,
    tours: `${environment.server}/tours`,
    tour: `${environment.server}/tour/`,
    countries: `${environment.server}/countries`,
    weather: "https://api.open-meteo.com/v1/forecast",
    countryByCode: "https://geocoding-api.open-meteo.com/v1/search",
    orders: `${environment.server}/orders`,
} as const;

export const API = new InjectionToken<IConfig>("app.config", {
    factory: () => apiData,
});
