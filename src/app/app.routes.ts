import { Routes } from "@angular/router";
import { AuthComponent } from "./pages/auth/auth.component";
import { LayoutComponent } from "./layout/layout.component";
import { ToursComponent } from "./pages/tours/tours.component";
import { SettingsComponent } from "./pages/settings/settings.component";
import { OrderComponent } from "./pages/order/order.component";

export const routes: Routes = [
    {
        path: "",
        component: LayoutComponent,
        children: [
            { path: "", component: ToursComponent },
            { path: "settings", component: SettingsComponent },
            {
                path: "tour/:id",
                loadComponent: () =>
                    import("./pages/tours/tour-item/tour-item.component").then(
                        (c) => c.TourItemComponent,
                    ),
            },
            {
                path: 'order',
                component: OrderComponent,
            },
        ],
    },
    {
        path: "auth",
        loadComponent: () =>
            import("./pages/auth/auth.component").then((c) => c.AuthComponent),
    },
    {
        path: "**",
        component: ToursComponent,
    },
];
