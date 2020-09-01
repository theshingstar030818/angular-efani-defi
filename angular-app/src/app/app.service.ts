import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

import * as Parse from 'parse';

Parse.initialize('YOUR_APP_ID', 'YOUR_MASTER_KEY'); // use your appID & your js key
// (Parse as any).serverURL = 'ht' + 'tp://localhost:1337/parse'; // use your server url
(Parse as any).serverURL = 'ht' + 'tp://95.217.18.84:1337/parse'; // use your server url

@Injectable({
  providedIn: 'root'
})
export class AppService {

  private apiKey = `03dc0f3c785e965b6c5cdff5d627fe508f15bfeb960b3c0842ced89fefec`;
  private exchangesUrl = 'https://data-api.defipulse.com/api/v1/blocklytics/pools/v1/exchanges';
  private ethGasUrl = 'https://data-api.defipulse.com/api/v1/egs/api/ethgasAPI.json';

  constructor(private client: HttpClient) {
    console.log(this.apiKey);

  }

  public subscribe(phoneNumber: number, speed: string, gasPrice: number) {
    const Subscriber = Parse.Object.extend('Subscribers');
    const subscriber = new Subscriber();

    subscriber.set('phoneNumber', phoneNumber);
    subscriber.set('speed', speed);
    subscriber.set('gasPrice', gasPrice);

    return subscriber.save();
  }

  public getSubscribers(): Promise <any> {
    const Subscribers = Parse.Object.extend('Subscribers');
    const query = new Parse.Query(Subscribers);
    return query.find();
  }

  getGas() {
    const options = {
      responseType: 'json' as const,
      params: { 'api-key': this.apiKey },
    };
    return this.client.get(this.ethGasUrl , options);
  }

  getPools() {
    const options = {
      responseType: 'json' as const,
      params: { 'api-key': this.apiKey, orderBy: 'roi' },
    };
    return this.client.get(this.exchangesUrl , options);
  }
}
