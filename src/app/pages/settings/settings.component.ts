import { Component } from "@angular/core";
import { MatTabsModule } from "@angular/material/tabs";
import { TourUploadComponent } from "./tour-upload/tour-upload.component";

@Component({
    selector: "app-settings",
    imports: [MatTabsModule, TourUploadComponent],
    templateUrl: "./settings.component.html",
    styleUrl: "./settings.component.scss",
})
export class SettingsComponent {}
