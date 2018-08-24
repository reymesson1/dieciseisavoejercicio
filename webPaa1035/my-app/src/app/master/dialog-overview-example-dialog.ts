import {Component, Inject, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { RestSourceData } from 'src/app/model/rest.datasource';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Observable} from 'rxjs';
import {startWith, map} from 'rxjs/operators';
import {FormControl} from '@angular/forms';
export interface DialogData {
  animal: string;
  name: string;
}

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: any[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'} 
];

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
  templateUrl: 'dialog-overview-example-dialog.html',
  styleUrls: ['dialog-overview-example-dialog.scss']
})
export class DialogOverviewExampleDialog  implements OnInit {

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = ELEMENT_DATA;

  myControl = new FormControl();
  
  options: any[] = this.dataRef.descriptiongroups;
  
  filteredOptions: Observable<any[]>;

  stateForm: FormGroup = this.fb.group({
    stateGroup: '',
  });

  descriptionForm: FormGroup = this.fb.group({
    descriptionGroup: '',
  });

  stateGroups: StateGroup[] = this.dataRef.stategroups;

  nextDay: Date;

  stateGroupOptions: Observable<StateGroup[]>;  
  
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, private dataRef : RestSourceData, private fb: FormBuilder) {
      this.nextDay = new Date();
    }

    ngOnInit() {

      this.dataSource = [];
      this.dataRef.getDetailGroups();
      
      this.stateGroupOptions = this.stateForm.get('stateGroup')!.valueChanges
        .pipe(
          startWith(''),
          map(value => this._filterGroup(value))
        );
        this.filteredOptions = this.myControl.valueChanges
        .pipe(
          startWith(''),
          map(value => this._filter(value))
        );
        
    }
  
  
  masterData : any = {}; 
  masterDetailData : any = {};
  isItem: boolean = false;
  masterDataArr = [];
  isNum : Number = 1;

  private _filter(value: string): any[] {
    const filterValue = value.toLowerCase();

    return this.dataRef.descriptiongroups.filter(option => option.toLowerCase().includes(filterValue));
  }

  private _filterGroup(value: string): StateGroup[] {
    if (value) {
      return this.stateGroups
        .map(group => ({letter: group.letter, names: _filter(group.names, value)}))
        .filter(group => group.names.length > 0);
    }

    return this.stateGroups;
  }

  
  masterDetailDataSubmit(){
        
    this.masterDetailData["position"] = this.nextDay.getTime();    
    this.masterDetailData["description"] = this.masterData.description;        
    this.masterDetailData["value"] = this.masterData.value;
    this.masterDetailData["symbol"] = this.masterData.value;        
    
    this.masterDataArr.push(this.masterDetailData);  
    this.masterDetailData = {};  
  }
  
  onNoClick(): void {            
      this.masterData["position"] = this.nextDay.getTime();      
      this.masterData["date"] = this.nextDay.toLocaleDateString() + " " + this.nextDay.toLocaleTimeString();
      this.masterData["items"] = this.masterDataArr;
      this.masterData["token"] = this.dataRef.token;      
      this.dataRef.postMaster(this.masterData);
      console.log(this.masterData);
      this.dialogRef.close();
  }


}