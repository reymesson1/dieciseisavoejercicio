import { Component, Input, Optional, Injectable } from '@angular/core';
import { VERSION } from '@angular/material';
import { FormControl, Validators, ControlContainer, FormGroup } from '@angular/forms';
import { map, filter } from 'rxjs/operators';

import { RestSourceData } from "../model/rest.datasource";

@Component({
  selector: 'registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent {
  @Input() control: FormControl;
  @Input() placeholder: string;

  registerData : any = {}

  constructor(private data : RestSourceData){}

  Post(){
    
    this.data.sendUserRegistration(this.registerData);
    this.registerData = {};
  }
  
}
