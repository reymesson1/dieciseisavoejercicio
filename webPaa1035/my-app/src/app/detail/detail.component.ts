import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { DialogOverviewExampleDialogDetail } from "./dialog-overview-example-dialog-detail";
import { RestSourceData } from 'src/app/model/rest.datasource';
import { DataSource } from '@angular/cdk/collections';
import {Sort} from '@angular/material';
import {MatSort,MatPaginator, MatTableDataSource} from '@angular/material';
import {Router} from '@angular/router';

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'item1',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent {
  title = 'my-app';
  displayedColumns: string[] = ['position', 'date','name', 'weight', 'symbol','actions'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  animal: string;
  name: string;  
  spinner: boolean = true;
  dataSource;

  constructor(public dialog: MatDialog, public data: RestSourceData,private route:Router,) {}
  
  ngOnInit(){
    
    this.data.getDetail();
    
    setTimeout(() => {
      this.dataSource = new MatTableDataSource<any>(this.data.detail);
      this.dataSource.sort = this.sort;  
      this.dataSource.paginator = this.paginator;
    }, 2000);

    setTimeout(() => {
      this.spinner = false;
    }, 2000);


  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialogDetail, {
      width: '250px',
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