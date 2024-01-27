import { Component } from "@angular/core";
import { RouterLink } from "@angular/router";

@Component({
  selector: "header-weather-app",
  standalone: true,
  imports: [RouterLink],
  templateUrl: "./header.component.html",
})
export class HeaderComponent {}
