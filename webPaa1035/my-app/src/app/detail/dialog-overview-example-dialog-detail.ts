import {Component, Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { RestSourceData } from 'src/app/model/rest.datasource';

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'modal1',
  templateUrl: 'dialog-overview-example-dialog-detail.html',
})
export class DialogOverviewExampleDialogDetail {

  nextDay: Date;

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialogDetail>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, private dataRef : RestSourceData) {
      this.nextDay = new Date();
    }
    
  detailData : any = {}; 

  onNoClick(): void {
      this.detailData["position"] = this.nextDay.getTime();
      this.detailData["date"] = this.nextDay.toLocaleDateString() + " " + this.nextDay.toLocaleTimeString();
      this.detailData["token"] = this.dataRef.token;      
      this.dataRef.postDetail(this.detailData);
      this.dialogRef.close();
  }


}