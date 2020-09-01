import { Component } from '@angular/core';
import { AppService } from './app.service';

import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public gas = {};
  public defaultSpeed = 'safeLow';

  public subscriberForm = new FormGroup({
    phoneNumber: new FormControl(null, [Validators.required]),
    speed: new FormControl(this.defaultSpeed, [Validators.required]),
    gasPrice: new FormControl(70, [Validators.required]),
  });

  constructor(private appService: AppService) {
    appService.getGas().subscribe((data) => {
      console.log(data);
      this.gas = data;
    });
    appService.getSubscribers().then((subscribers) => {
      console.log(subscribers);
    });
  }

  public saveSubscriber() {
    console.log(this.subscriberForm.value);
    const formValue = this.subscriberForm.value;
    this.appService.subscribe(formValue.phoneNumber, formValue.speed, formValue.gasPrice).then((savedSubscriber) => {
      // Execute any logic that should take place after the object is saved.
      console.log('New object created with objectId: ', savedSubscriber);
    }, (error) => {
      // Execute any logic that should take place if the save fails.
      // error is a Parse.Error with an error code and message.
      console.error('Failed to create new object, with error code: ' + error.message);
    });
  }

  public getWaitTimeString(minutes: number) {
    const seconds = minutes * 60;
    const s = seconds % 60;
    const m = (seconds - s) / 60;
    let waitTimeString: string;
    if (m !== 0) {
      waitTimeString = ('~ ' + m + ' mins, ' + s + ' seconds ' );
    } else {
      waitTimeString = ('~ ' + s + ' seconds ' );
    }
    return waitTimeString;
  }

  public keepOriginalOrder = (a, b) => a.key;

}
