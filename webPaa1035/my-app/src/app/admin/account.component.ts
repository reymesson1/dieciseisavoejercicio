import { Component } from '@angular/core';
import { RestSourceData } from "../model/rest.datasource";
import {Router} from '@angular/router';

@Component({
  selector: 'account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent {
  title = 'my-app';
  backgroundColor: string = 'white'; 
  btnToggle=false;
  accountData : any = {};
  profileName
  
  constructor(private route: Router,private data: RestSourceData){}

  ngOnInit(){    
    this.data.getProfile();
    this.profileName = this.data.whois    
    console.log(this.data.whois.username);
  }

  toggle(){
    
    this.btnToggle = !this.btnToggle;
  }

  mouseEnter(){
    this.backgroundColor = 'gray';    
  }  
  mouseLeave(){
    this.backgroundColor = 'white';    
  }

  Post(){
    
    this.data.setPassword(this.accountData);    
    this.accountData = {};    
  }
  
}
