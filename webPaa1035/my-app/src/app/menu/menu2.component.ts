import { Component } from '@angular/core';
import { RestSourceData } from "../model/rest.datasource";


@Component({
  selector: 'menu2',
  templateUrl: './menu2.component.html',
  styleUrls: ['./menu2.component.scss']
})
export class Menu2Component {
  title = 'my-app';

  
  constructor(public data: RestSourceData){}
  
    logoff(){
      this.data.logout();
    }

}
