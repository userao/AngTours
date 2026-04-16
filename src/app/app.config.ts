import { ApplicationConfig, provideZoneChangeDetection } from "@angular/core";
import { provideRouter } from "@angular/router";
import { routes } from "./app.routes";
import { provideHttpClient } from "@angular/common/http";
import { provideNativeDateAdapter } from "@angular/material/core";
import { provideAnimations } from "@angular/platform-browser/animations"
import { registerLocaleData } from '@angular/common';
import ru from '@angular/common/locales/ru';
import { provideNzI18n, ru_RU } from 'ng-zorro-antd/i18n';

registerLocaleData(ru);

export const appConfig: ApplicationConfig = {
    providers: [
        provideZoneChangeDetection({ eventCoalescing: true }),
        provideRouter(routes),
        provideHttpClient(),
        provideNativeDateAdapter(),
        provideAnimations(),
        provideNzI18n(ru_RU),
    ],
};

