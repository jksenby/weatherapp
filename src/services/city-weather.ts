import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, concatMap, map, take, tap, switchMap } from "rxjs";

@Injectable()
export class CityWeatherService {
  constructor(private http: HttpClient) {}

  getCity(cityName, _apiKey) {
    return this.http.get(
      `http://api.openweathermap.org/geo/1.0/direct?q=${cityName},&limit=${5}&appid=${_apiKey}`
    );
  }
  getWeatherData(cityName: string, _apiKey: string) {
    return this.getCity(cityName, _apiKey).pipe(
      switchMap((res) => {
        return this.getWeather(res[0].lat, res[0].lon, _apiKey);
      })
    );
  }
  getWeather(lat, lon, _apiKey) {
    return this.http.get(
      `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${_apiKey}`
    );
  }
}
