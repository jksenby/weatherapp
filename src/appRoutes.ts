import { Routes } from "@angular/router";
import { HomeComponent } from "./components/home/home.component";
import { MapComponent } from "./components/map/map.component";
import { FlightsComponent } from "./components/flights/flights.component";

export const appRoutes: Routes = [
  { path: "", component: HomeComponent, pathMatch: "full" },
  { path: "map", component: MapComponent, pathMatch: "full" },
  { path: "flights", component: FlightsComponent, pathMatch: "full" },
];
