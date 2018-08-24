import {Component, Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { RestSourceData } from 'src/app/model/rest.datasource';

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'modal1',
  templateUrl: 'dialog-overview-example-dialog1.html',
})
export class DialogOverviewExampleDialog1 {

  nextDay: Date;

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog1>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, private dataRef : RestSourceData) {
      this.nextDay = new Date();
    }
    
  masterData : any = {}; 

  onNoClick(): void {
      this.masterData["position"] = this.nextDay.getTime();
      this.masterData["date"] = this.nextDay.toLocaleDateString() + " " + this.nextDay.toLocaleTimeString();
      this.masterData["token"] = this.dataRef.token;      
      this.dataRef.postMessageItem1(this.masterData);
      this.dialogRef.close();
  }


}