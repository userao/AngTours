import { Routes } from "@angular/router";
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
        path: 'order/:id',
        component: OrderComponent,
      },
      {
        path: 'cart',
        loadComponent: () => import("./pages/cart/cart.component").then(c => c.CartComponent)
      }
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
