import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { switchMap } from "rxjs";

@Injectable()
export class CityWeatherService {
  _apiKey: string = "da3ac2462a97bb568fd9e123732c9d5e";
  constructor(private http: HttpClient) {}

  getCity(cityName) {
    return this.http.get(
      `http://api.openweathermap.org/geo/1.0/direct?q=${cityName},&limit=${5}&appid=${
        this._apiKey
      }`
    );
  }
  getWeatherData(cityName: string) {
    return this.getCity(cityName).pipe(
      switchMap((res) => {
        return this.getWeather(res[0].lat, res[0].lon);
      })
    );
  }
  getWeather(lat, lon) {
    return this.http.get(
      `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${this._apiKey}`
    );
  }
  getCurrentWeather(lat, lon) {
    return this.http.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${this._apiKey}`
    );
  }
}
