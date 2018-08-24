import { Component } from '@angular/core';
import { RestSourceData } from "./model/rest.datasource";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'my-app';

  constructor(public data: RestSourceData){}

  logoff(){
    this.data.logout();
  }
}
