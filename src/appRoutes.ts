import { Routes } from "@angular/router";
import { HomeComponent } from "./components/header/home.component";

export const appRoutes: Routes = [
    {path: "", component: HomeComponent, pathMatch: 'full'}
]