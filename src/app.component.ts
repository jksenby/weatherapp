import { Component } from "@angular/core";
import { RouterModule, RouterLink } from "@angular/router";

@Component({
  selector: "weather-app",
  standalone: true,
  imports: [RouterModule, RouterLink],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.scss",
})
export class AppComponent {}
