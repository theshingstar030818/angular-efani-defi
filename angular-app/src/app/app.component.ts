import { Component } from '@angular/core';
import { AppService } from './app.service';

import { FormControl, FormGroup, Validators } from '@angular/forms';
import {MatDialog } from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';

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

  constructor(private appService: AppService, public dialog: MatDialog) {
    appService.getGas().subscribe((data) => {
      console.log(data);
      this.gas = data;
    });
    appService.getSubscribers().then((subscribers) => {
      console.log(subscribers);
    });
  }

  public saveSubscriber() {
    const formValue = this.subscriberForm.value;
    this.appService.subscribe(formValue).then((savedSubscriber) => {
      this.openDialog(savedSubscriber);
    }, (error) => {
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

  public openDialog(subscriberData): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      data: subscriberData
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
      // this.animal = result;
    });
  }

}
