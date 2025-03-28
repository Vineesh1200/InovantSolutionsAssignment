import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: "",
        redirectTo: "login",
        pathMatch: "full"
    },
    {
        path: "login",
        loadComponent: () => import("./views/login/login.component").then(s => s.LoginComponent)
    },
    {
        path: "profile",
        loadComponent: () => import("./views/profile/profile.component").then(s => s.ProfileComponent)
    },
];
