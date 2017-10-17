import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { WeatherProvider } from '../../providers/weather/weather';
import { Storage } from '@ionic/storage';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  weather:any;
  public zmw;
  location:{
    city:string,
    state:string
  }
  constructor(
  	public navCtrl: NavController, 
  	private weatherProvider:WeatherProvider,
  	private storage:Storage) {

  }
  ionViewWillEnter(){
  	this.storage.get('zmw').then((val) => {
  		if (val != null){
  			this.zmw = JSON.parse(val);
  			/*this.location = JSON.parse(val);*/
  		}
  		else {
  			this.zmw = '00000.96.48819';
  			/*this.location = {
	  			city: 'Hanoi',
  				state: 'VN'
  			}*/
  		}

  		this.weatherProvider.getWeather(this.zmw)
  		.subscribe(weather => {
  		this.weather = weather.current_observation;
  		});
  	});

  	
  	
  }
}
