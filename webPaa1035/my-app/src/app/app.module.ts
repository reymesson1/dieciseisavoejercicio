import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatOptionModule,  
  MatFormFieldControl,
  // MatSpinner
} from '@angular/material';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

import { Routes, RouterModule } from '@angular/router';
import {MatFormFieldModule} from '@angular/material/form-field';
import { HttpClientModule } from '@angular/common/http';
import { MomentModule } from 'angular2-moment';

import { HomeComponent } from "./home/home.component";
import { MasterComponent } from "./master/master.component";
import { DetailComponent } from "./detail/detail.component";
import { RegistrationComponent } from "./admin/registration.component";  
import { LoginComponent } from "./admin/login.component";
import { ViewComponent } from "./master/view.component";
import { RestSourceData }  from "./model/rest.datasource";
import { AccountComponent } from "./admin/account.component";

import { DialogOverviewExampleDialog } from "./master/dialog-overview-example-dialog";

import { Menu1Component } from "./menu/menu1.component";
import { Menu2Component } from "./menu/menu2.component";

import { Item1Component } from "./item/item1.component";
import { DialogOverviewExampleDialog1 } from "./item/dialog-overview-example-dialog1";
import { ReportComponent } from "./report/report.component";

import { BoxingComponent } from "./boxing/boxing.component";
import { ViewBoxingComponent } from "./boxing/view-boxing.component";
import { DialogOverviewExampleDialogBoxing } from "./boxing/dialog-overview-example-dialog-boxing";

import { DialogOverviewExampleDialogDetail } from "./detail/dialog-overview-example-dialog-detail";

import { AuthGuard } from "./services/auth.guard.service";

import { Item2Component } from "./item2/item2.component";
import { DialogOverviewExampleDialog2 } from "./item2/dialog-overview-example-dialog2";

@NgModule({ 
  declarations: [
     AppComponent,HomeComponent, MasterComponent, DetailComponent, RegistrationComponent, LoginComponent, DialogOverviewExampleDialog, ViewComponent, AccountComponent, Menu1Component, Menu2Component, Item1Component, DialogOverviewExampleDialog1, ReportComponent, BoxingComponent, ViewBoxingComponent,DialogOverviewExampleDialogBoxing,DialogOverviewExampleDialogDetail, Item2Component, DialogOverviewExampleDialog2
  ],
  imports: [
    MomentModule,BrowserModule, HttpClientModule,FormsModule, ReactiveFormsModule, BrowserAnimationsModule, 
    MatButtonModule, MatCheckboxModule, MatToolbarModule, MatListModule, MatIconModule, MatGridListModule, 
    MatDividerModule, MatCardModule, MatTableModule, MatTooltipModule,  MatFormFieldModule,  MatRadioModule,MatOptionModule,MatSelectModule, MatSliderModule,  MatInputModule,  
    MatDialogModule, MatMenuModule, MatProgressBarModule,MatSortModule, MatPaginatorModule, MatProgressSpinnerModule,   MatTabsModule, MatAutocompleteModule,
    RouterModule.forRoot([
      { path: "home", component: HomeComponent },
      { path: "master", component: MasterComponent, canActivate: [ AuthGuard ] },      
      { path: "detail", component: DetailComponent, canActivate: [ AuthGuard ] },
      { path: "registration", component: RegistrationComponent },
      { path: "login", component: LoginComponent },
      { path: "view", component: ViewComponent },
      { path: "view/:id", component: ViewComponent },
      { path: "boxing", component: BoxingComponent },
      { path: "boxing-view", component: ViewBoxingComponent },
      { path: "boxing-view/:id", component: ViewBoxingComponent },
      { path: "account", component: AccountComponent },
      { path: "item1", component: Item1Component },
      { path: "item2", component: Item2Component },
      { path: "report", component: ReportComponent },
      { path: "**", redirectTo: '/master' }  
    ])
  ],
  providers: [RestSourceData, AuthGuard],
  bootstrap: [AppComponent, DialogOverviewExampleDialog, DialogOverviewExampleDialog1, DialogOverviewExampleDialogBoxing, DialogOverviewExampleDialogDetail, DialogOverviewExampleDialog2]
})
export class AppModule { }
