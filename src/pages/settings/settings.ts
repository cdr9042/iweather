import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { HomePage } from '../home/home';
import { WeatherProvider } from '../../providers/weather/weather';
/**
 * Generated class for the SettingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage{
	public city;
  searchStr:string;
	state:string;
  public results;
  public searchStr;
  constructor(public navCtrl: NavController, 
  	public navParams: NavParams,
  	private storage:Storage,
    private weatherProvider:WeatherProvider) {
  		this.storage.get('city').then((val)=> {
  			if (val != null){
          this.searchStr=JSON.parse(val);
  			} 
  			else {
          this.city = [];
          this.zmw='00000.96.48819';
  				this.searchStr = 'Hanoi';
  			}
  		});
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
  }
  getQuery() {
    this.weatherProvider.searchCities(this.searchStr)
      .subscribe(res => {
        this.results = res.RESULTS;
      });
  }
  chooseCity(city) {
    // Clear list
    this.results = [];
    this.city = city;
    this.searchStr = city.name;
  }
  saveForm(){
  	let location = {
  		city: this.city,
  		state: this.state
  	}
    this.storage.set('city',JSON.stringify(this.city.name));
    this.storage.set('zmw',JSON.stringify(this.city.zmw));
  	this.storage.set('location',JSON.stringify(location));
  	this.navCtrl.push(HomePage);
  }
}
