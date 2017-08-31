import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  private state = false;
  private search = '';
  private weatherData = {
    icon: '',
    main: '',
    city: '',
    description: '',
    temp: '',
  };

  private openWeatherConfig = {
    searchUrl: 'http://api.openweathermap.org/data/2.5/weather?q=',
    units: '&units=metric',
    appid: '&appid=77f0ce12a4840ca7a2403f7ed24f939b',
    imgUrl:'http://openweathermap.org/img/w/'
  };

  constructor(public navCtrl: NavController, private http: HttpClient) {}

  loadWeather(): void {

    let url = this.openWeatherConfig.searchUrl + this.search + this.openWeatherConfig.units
      + this.openWeatherConfig.appid;


    this.http.get(url).subscribe(data => {

      this.weatherData.icon = this.openWeatherConfig.imgUrl + data['weather'][0].icon + '.png';
      this.weatherData.main = data['weather'][0].main;
      this.weatherData.city = data['name'];
      this.weatherData.description = data['weather'][0].description;
      this.weatherData.temp = data['main'].temp;
      this.state = true;

      console.log(data);
    })
  }

}
