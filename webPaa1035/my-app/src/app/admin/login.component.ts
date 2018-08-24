import { Component } from '@angular/core';
import { RestSourceData } from "../model/rest.datasource";

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  title = 'my-app';

  constructor(private data: RestSourceData){}

  loginData : any = {};


  Post(){
    this.data.loginUser(this.loginData);
  }
}
