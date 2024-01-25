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
      .getWeatherData(this.cityName)
      .subscribe({ next: (data: any) => (this.cityWeatherData = data) });
  }
  log() {
    console.log(this.cityWeatherData);
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
