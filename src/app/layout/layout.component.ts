import { Component, inject } from "@angular/core";
import { AsideComponent } from "./aside/aside.component";
import { FooterComponent } from "./footer/footer.component";
import { HeaderComponent } from "./header/header.component";
import { RouterModule } from "@angular/router";
import { LoaderComponent } from "../shared/components/loader/loader.component";
import { AsyncPipe } from "@angular/common";
import { LoaderService } from "../services/loader.service";

@Component({
    selector: "app-layout",
    imports: [
        AsideComponent,
        HeaderComponent,
        FooterComponent,
        RouterModule,
        LoaderComponent,
        AsyncPipe,
    ],
    templateUrl: "./layout.component.html",
    styleUrl: "./layout.component.scss",
})
export class LayoutComponent {
    private loaderService = inject(LoaderService);
    loaderStatus$ = this.loaderService.loader$;
}
