import { Routes } from "@angular/router";
import { HomeComponent } from "./components/home/home.component";
import { MapComponent } from "./components/map/map.component";

export const appRoutes: Routes = [
  { path: "", component: HomeComponent, pathMatch: "full" },
  { path: "map", component: MapComponent, pathMatch: "full" },
];
