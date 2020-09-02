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

  private getRandomInt() {
    let min = 1111;
    let max = 9999;
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
  }

  public verifySubscriber(subscriber, oneTimePin) {
    console.log(subscriber);
    console.log(oneTimePin);
    return Parse.Cloud.run('verifySubscriber', { subscriberId: subscriber.id, otp: oneTimePin });
  }

  public subscribe(formValue: any) {
    return Parse.Cloud.run('saveSubscriber', { subscriberFormValue: formValue });
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
