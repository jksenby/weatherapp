import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { CityWeatherService } from "../../services/city-weather";
import { CommonModule } from "@angular/common";

@Component({
  selector: "weather-app-home",
  standalone: true,
  imports: [FormsModule, HttpClientModule, CommonModule],
  templateUrl: "./home.component.html",
  styleUrl: "./home.component.scss",
  providers: [CityWeatherService],
})
export class HomeComponent {
  _apiKey: string = "da3ac2462a97bb568fd9e123732c9d5e";

  searchResult: boolean = false;
  cityName: string = localStorage.getItem("defaultCityName");
  cityWeatherData;

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

  constructor(private cityWeather: CityWeatherService) {
    if (localStorage.getItem("defaultCityName")) this.onSubmitCityName();
  }

  async onSubmitCityName($event = null) {
    if ($event) $event.preventDefault();
    localStorage.setItem("defaultCityName", this.cityName);
    await this.cityWeather
      .getWeatherData(this.cityName, this._apiKey)
      .subscribe({ next: (data: any) => (this.cityWeatherData = data) });
  }
  log() {
    console.log(this.cityWeatherData);
  }
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

    return day + " " + this.monthNames[month] + " " + hours + ":" + minutes;
  }
  getDay(day) {
    const weekdays = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    return weekdays[new Date(day).getDay()];
  }
}
