import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { AppService } from '../app.service';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  public subscriber;
  public oneTimePin = new FormControl('', [Validators.required]);

  public showSpinner = false;
  public errorMessage;

  constructor(
    private appService: AppService,
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.subscriber = data;
    }

  onNoClick(): void {
    this.dialogRef.close(null);
  }

  onVerify(): void {
    this.showSpinner = true;
    this.appService.verifySubscriber(this.subscriber, this.oneTimePin.value).then((result) => {
      this.showSpinner = false;
      if (result === 200) {
        this.dialogRef.close('Subscription verified');
      } else {
        this.errorMessage = result;
        this.oneTimePin.setErrors({incorrect: true});
      }
    });
  }

  ngOnInit() {
  }

}
