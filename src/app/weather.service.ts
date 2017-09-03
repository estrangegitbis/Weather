import { Injectable }     from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { openWeatherConfig } from "./openWeatherConfig";

@Injectable()
export class WeatherService {

  constructor (private http: HttpClient) {}

  public getWeather(city: string): Observable<any[]>{
    let url = openWeatherConfig.searchUrlByName + city + openWeatherConfig.units
      + openWeatherConfig.appid;

    return this.http.get(url);
  }

  public getWeatherCurrentPosition(latitude:number, longitude:number): Observable<any[]>{

      let url = openWeatherConfig.searchUrl + 'lat=' + latitude + '&lon=' + longitude
        + openWeatherConfig.units + openWeatherConfig.appid;
      return this.http.get(url);

  }

}
