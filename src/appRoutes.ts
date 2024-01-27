import { Routes } from "@angular/router";
import { WeatherComponent } from "./components/home/weather.component";
import { MapComponent } from "./components/map/map.component";
import { FlightsComponent } from "./components/flights/flights.component";

export const appRoutes: Routes = [
  { path: "", component: FlightsComponent, pathMatch: "full" },
  { path: "map", component: MapComponent, pathMatch: "full" },
  { path: "weather", component: WeatherComponent, pathMatch: "full" },
];
