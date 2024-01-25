import { Component, OnInit } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { AngularYandexMapsModule } from "angular8-yandex-maps";
import { CityWeatherService } from "src/services/city-weather";
import { NgIf } from "@angular/common";

@Component({
  selector: "weather-app-home",
  standalone: true,
  imports: [HttpClientModule, FormsModule, AngularYandexMapsModule, NgIf],
  templateUrl: "./map.component.html",
  styleUrls: ["./map.component.scss"],
  providers: [CityWeatherService],
})
export class MapComponent implements OnInit {
  cityData: any;

  monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  constructor(private cityWeather: CityWeatherService) {}
  ngOnInit(): void {}

  formatTimeDifference(timeDifferenceInSeconds) {
    let timeDifferenceInMillis = timeDifferenceInSeconds * 1000;

    let currentDate = new Date();

    currentDate.setTime(currentDate.getTime() + timeDifferenceInMillis);

    let day = currentDate.getUTCDate().toString();
    let month = currentDate.getUTCMonth().toString();
    let hours = currentDate.getUTCHours().toString();
    let minutes = currentDate.getUTCMinutes().toString();

    day = +day < 10 ? "0" + day : day;
    hours = +hours < 10 ? "0" + hours : hours;
    minutes = +minutes < 10 ? "0" + minutes : minutes;

    return { day, hours, minutes, month: this.monthNames[+month] };
  }

  onMapClick(event) {
    const [lat, lon] = event.target._yandexState._model.center;
    this.cityWeather.getCurrentWeather(lat, lon).subscribe({
      next: (data: any) => (this.cityData = data),
    });
  }
}
