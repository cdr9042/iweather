import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class WeatherProvider {
  apiKey = 'b4f4d1b81f303ee9';
  searchUrl:string;
  url;
  constructor(public http: Http) {
    console.log('Hello WeatherProvider Provider');
    this.url = 'http://api.wunderground.com/api/' +this.apiKey+ '/conditions/q';
    this.searchUrl = 'http://localhost:8100/search/aq?query=';
  }
  getWeather(zmw){
  	return this.http.get(this.url+'/zmw:'+zmw+'.json')
  	.map(res => res.json());
  }
  searchCities(searchStr){
    return this.http.get(this.searchUrl + searchStr)
    .map(res => res.json());
  }
}
