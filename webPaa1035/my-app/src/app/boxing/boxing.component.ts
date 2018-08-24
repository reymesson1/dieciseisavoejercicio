import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { DialogOverviewExampleDialogBoxing } from "./dialog-overview-example-dialog-boxing";
import { RestSourceData } from 'src/app/model/rest.datasource';
import { DataSource } from '@angular/cdk/collections';
import {Sort} from '@angular/material';
// import { MatSpinner } from '@angular/material';
import {MatSort,MatPaginator, MatTableDataSource} from '@angular/material';
import {Router} from '@angular/router';

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'boxing',
  templateUrl: './boxing.component.html',
  styleUrls: ['./boxing.component.scss']
})
export class BoxingComponent implements OnInit {
  title = 'my-app';  
  displayedColumns: string[] = ['position', 'date','name', 'weight', 'symbol','actions'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  animal: string;
  name: string;
  totalCredit;
  totalDebit;
  totalItem1;
  totalItem2;
  spinner: boolean = true;
  dataSource;
    
  constructor(public dialog: MatDialog, public data: RestSourceData,private route:Router,) {}
      
    ngOnInit(){ 
    
    this.data.getMessage();
    this.data.getDashboard();
    this.data.getStateGroups();
    this.data.getProfile();
    
    setTimeout(() => {
      this.totalCredit = this.data.dashboard[0].total;
      this.totalDebit = this.data.dashboard[3].total;
      this.totalItem1 = this.data.dashboard[2].total;
      this.totalItem2 = this.data.dashboard[1].total;
      this.dataSource = new MatTableDataSource<any>(this.data.messages);
      this.dataSource.sort = this.sort;  
      this.dataSource.paginator = this.paginator;
    }, 2000);

    setTimeout(() => {
      this.spinner = false;
    }, 2000);

  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialogBoxing, {
      width: '350px',
      data: {name: this.name, animal: this.animal}
    });
    
    dialogRef.afterClosed().subscribe(result => {
      
      this.animal = result;
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


}