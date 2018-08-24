import {Component, Inject, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { RestSourceData } from 'src/app/model/rest.datasource';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Observable} from 'rxjs';
import {startWith, map} from 'rxjs/operators';
export interface DialogData {
  animal: string;
  name: string;
}

export interface StateGroup {
  letter: string;
  names: string[];
}

export const _filter = (opt: string[], value: string): string[] => {
  const filterValue = value.toLowerCase();

  return opt.filter(item => item.toLowerCase().indexOf(filterValue) === 0);
};

@Component({
  selector: 'modal',
  templateUrl: 'dialog-overview-example-dialog-boxing.html',
  styleUrls: ['dialog-overview-example-dialog-boxing.scss']
})
export class DialogOverviewExampleDialogBoxing  implements OnInit {

  stateForm: FormGroup = this.fb.group({
    stateGroup: '',
  });

  stateGroups: StateGroup[] = this.dataRef.stategroups;
  

  nextDay: Date;

  stateGroupOptions: Observable<StateGroup[]>;  
  
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialogBoxing>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, private dataRef : RestSourceData, private fb: FormBuilder) {
      this.nextDay = new Date();
    }

    ngOnInit() {
      this.stateGroupOptions = this.stateForm.get('stateGroup')!.valueChanges
        .pipe(
          startWith(''),
          map(value => this._filterGroup(value))
        );
    }
    
  masterData : any = {}; 
  isItem: boolean = false;

  ngDoCheck(){
    if(this.masterData.type){
      if(this.masterData.type=="item1"||this.masterData.type=="item2"){        
        this.isItem = true;
      }else{
        this.isItem = false;
      }
    }
  }

  private _filterGroup(value: string): StateGroup[] {
    if (value) {
      return this.stateGroups
        .map(group => ({letter: group.letter, names: _filter(group.names, value)}))
        .filter(group => group.names.length > 0);
    }

    return this.stateGroups;
  }

  onNoClick(): void {
      this.masterData["position"] = this.nextDay.getTime();
      this.masterData["date"] = this.nextDay.toLocaleDateString() + " " + this.nextDay.toLocaleTimeString();
      this.masterData["token"] = this.dataRef.token;      
      this.dataRef.postMessage(this.masterData);
      
      this.dialogRef.close();
  }


}