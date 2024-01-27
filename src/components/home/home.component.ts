import { Component, HostListener } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { CityWeatherService } from "../../services/city-weather";
import { CommonModule } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { catchError } from "rxjs";

@Component({
  selector: "weather-app-home",
  standalone: true,
  imports: [FormsModule, HttpClientModule, CommonModule],
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
  providers: [CityWeatherService],
})
export class HomeComponent {
  searchResult: boolean = false;
  cityName: string = localStorage.getItem("defaultCityName");
  cityWeatherData;
  scrollTop = window.screenY;
  @HostListener("window:scroll", []) onWindowScroll() {
    this.scrollTop =
      window.scrollY ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0;
  }
  cityPhoto: any = {
    results: [
      {
        urls: {
          full: "../../assets/images/Museum.jpg",
        },
      },
    ],
  };
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
    await this.cityWeather
      .getWeatherData(this.cityName)
      .pipe(
        catchError((err) => {
          this.searchResult = false;
          return err;
        })
      )
      .subscribe({
        next: (data: any) => {
          localStorage.setItem("defaultCityName", this.cityName);

          this.searchResult = true;
          this.cityWeatherData = data;
          this.cityWeather
            .getPhoto(this.cityName)
            .subscribe({ next: (photo: any) => (this.cityPhoto = photo) });
        },
      });
  }
  screen = screen;
  log() {
    console.log(this.scrollTop);
    console.log(screen.height);
  }

  getAllPhotos() {
    const urls: string[] = this.cityPhoto.results.map((item) => {
      return `url(${item.urls.full}) `;
    });
    return urls.toString();
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
