import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { switchMap } from "rxjs";

@Injectable()
export class FlightService {
  _apiKeyNinja: string = "IAG81cwWmaNjJKPq2bBEpA==SmhgkHEoNoRqIbdT";
  constructor(private http: HttpClient) {}

  getTicket(from, to, departureDate, adults, childs, infants) {
    const headers = new HttpHeaders({ "X-Api-Key": this._apiKeyNinja });
    return this.http
      .get(`https://api.api-ninjas.com/v1/airports?name=${from}`, { headers })
      .pipe(
        switchMap((departationPlace) => {
          return this.http
            .get(`https://api.api-ninjas.com/v1/airports?name=${to}`, {
              headers,
            })
            .pipe(
              switchMap((arrivalPlace) => {
                return this.http.get(
                  `https://api.flightapi.io/onewaytrip/65b51d2e3f45ced3a293d2c8/${
                    departationPlace[0].iata
                  }/${
                    arrivalPlace[0].iata
                  }/${departureDate}/${+adults}/${+childs}/${+infants}/Economy/KZT`
                );
              })
            );
        })
      );
  }
}
