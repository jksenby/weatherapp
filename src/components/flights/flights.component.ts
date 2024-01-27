import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { FlightService } from "../../services/filgts-service";
import { HttpClientModule } from "@angular/common/http";

@Component({
  selector: "flights-weather-app",
  standalone: true,
  imports: [FormsModule, HttpClientModule],
  templateUrl: "./flights.component.html",
  styleUrls: ["flights.component.scss"],
  providers: [FlightService],
})
export class FlightsComponent {
  from: string;
  to: string;
  departureDate: any;
  adults: any;
  childs: any;
  infants: any;
  constructor(private flightService: FlightService) {}
  log() {
    this.flightService
      .getTicket(
        this.from,
        this.to,
        this.departureDate,
        this.adults,
        this.childs,
        this.infants
      )
      .subscribe({ next: (data: any) => console.log(data) });
  }
}
