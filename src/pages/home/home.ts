import {Component, OnInit} from '@angular/core';
import { NavController } from 'ionic-angular';
import { WeatherService } from "../../app/weather.service";
import { openWeatherConfig } from "../../app/openWeatherConfig";
import { Geolocation } from "@ionic-native/geolocation";


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit{

  ngOnInit(): void {

    this.geolocation.getCurrentPosition().then((resp) => {

      let latitude = resp.coords.latitude;
      let longitude = resp.coords.longitude;

      this.weatherService.getWeatherCurrentPosition(latitude, longitude)
        .subscribe(data =>{
          this.weatherData.icon = openWeatherConfig.imgUrl + data['weather'][0].icon + '.png';
          this.weatherData.main = data['weather'][0].main;
          this.weatherData.city = data['name'];
          this.weatherData.description = data['weather'][0].description;
          this.weatherData.temp = data['main'].temp;
          this.state = true;
        });
    }).catch((error) => {
      console.log('Error getting location', error);
    });

  }

  private state = false;
  private search = '';
  private weatherData = {
    icon: '',
    main: '',
    city: '',
    description: '',
    temp: '',
  };

  constructor(public navCtrl: NavController,
              private geolocation: Geolocation,
              private weatherService: WeatherService) {
  }

  loadWeather(): void {
    this.weatherService.getWeather(this.search)
      .subscribe(data => {
        this.weatherData.icon = openWeatherConfig.imgUrl + data['weather'][0].icon + '.png';
        this.weatherData.main = data['weather'][0].main;
        this.weatherData.city = data['name'];
        this.weatherData.description = data['weather'][0].description;
        this.weatherData.temp = data['main'].temp;
        this.state = true;
      });
  }
}
