import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class RestSourceData{

  constructor(private http: HttpClient, private route: Router){}

  master = []
  detail = []
  messages = []
  messages1 = []
  messages2 = []
  dashboard = []  
  stategroups = []
  descriptiongroups = []
  whois : any = {}
  TOKEN_KEY = 'token'
  //authPath = 'http://159.203.156.208:4201'
  authPath = 'http://localhost:4201'
  hash

  getMaster() {      

    this.http.get<any>(this.authPath +'/master/'+this.token).subscribe(res =>{
        this.master = res;
    })        
  }

  getDetail() {      

    this.http.get<any>(this.authPath +'/detail/'+this.token).subscribe(res =>{
        this.detail = res;
    })        
  }

  getMessage() {      

    this.http.get<any>(this.authPath +'/posts/'+this.token).subscribe(res =>{
        this.messages = res;
    })        
  }

  getMessage1() {      

    this.http.get<any>(this.authPath +'/posts1/'+this.token).subscribe(res =>{
        this.messages1 = res;
    })        
  }

  getMessage2() {      
    
        this.http.get<any>(this.authPath +'/posts2/'+this.token).subscribe(res =>{
            this.messages2 = res;
        })        
      }
      

  getDashboard() {      
    
    this.http.get<any>(this.authPath +'/recapposts/'+this.token).subscribe(res =>{
        this.dashboard = res;
    })        
  }

  postMaster(message) {
              
      this.master.push(message);
      this.http.post<any>(this.authPath +'/master', message).subscribe(res =>{
        this.master = res                
      });
      setTimeout(() => {
          this.getDashboard();
          this.route.navigateByUrl('/detail');
      }, 1000);
      setTimeout(() => {
          this.route.navigateByUrl('/master');
      }, 1000);
  }

  postDetail(message) {
              
      this.detail.push(message);
      this.http.post<any>(this.authPath +'/detail', message).subscribe(res =>{
        this.detail = res                
      });
      setTimeout(() => {
          this.getDashboard();
          this.route.navigateByUrl('/detail');
      }, 1000);
      setTimeout(() => {
          this.route.navigateByUrl('/master');
      }, 1000);
  }

  postMessage(message) {
              
      this.messages.push(message);
      this.http.post<any>(this.authPath +'/post', message).subscribe(res =>{
        this.messages = res                
      });
      setTimeout(() => {
          this.getDashboard();
          this.route.navigateByUrl('/detail');
      }, 1000);
      setTimeout(() => {
          this.route.navigateByUrl('/master');
      }, 1000);
  }

  postMessageItem1(message) {
    
      this.messages1.push(message);
      this.http.post<any>(this.authPath +'/post1', message).subscribe(res =>{
          this.messages1 = res                
        });
        setTimeout(() => {
            this.getDashboard();
            this.route.navigateByUrl('/detail');
        }, 1000);
        setTimeout(() => {
            this.route.navigateByUrl('/master');
        }, 1000);
  }

  postMessageItem2(message) {
    
      this.messages2.push(message);
      this.http.post<any>(this.authPath +'/post2', message).subscribe(res =>{
          this.messages2 = res                
        });
        setTimeout(() => {
            this.getDashboard();
            this.route.navigateByUrl('/detail');
        }, 1000);
        setTimeout(() => {
            this.route.navigateByUrl('/master');
        }, 1000);
  }
        
  get token(){
      return localStorage.getItem(this.TOKEN_KEY);
  }

  get isAuthenticated(){
      return !!localStorage.getItem(this.TOKEN_KEY)
  }

  logout(){
      localStorage.removeItem(this.TOKEN_KEY);
      this.route.navigateByUrl('/login');
  }

  loginUser(loginData) {
        this.http.post<any>(this.authPath + '/login', loginData).subscribe(res =>{
            
            localStorage.setItem(this.TOKEN_KEY, res.token)
            if(this.isAuthenticated){
                this.route.navigateByUrl("/")
            }else{
                console.log("Registration Failed")
            }   
        })
    };

  sendUserRegistration(regData) {
    this.http.post<any>(this.authPath + '/register', regData).subscribe(res =>{ 

        localStorage.setItem(this.TOKEN_KEY, res.token)  
        if(this.isAuthenticated){
            this.route.navigateByUrl("/")
        }else{
            console.log("Registration Failed")
        }     
    })    
  }

  setPassword(accData) {
    this.http.post<any>(this.authPath + '/changepassword', accData).subscribe(res =>{ 
          console.log(res);
    })
  }

  getStateGroups() {      
    
    this.http.get<any>(this.authPath +'/stategroups/'+this.token).subscribe(res =>{
        
        this.stategroups = res;
    })        
  }

  getDetailGroups() {      
      
      this.http.get<any>(this.authPath +'/descriptiongroups/'+this.token).subscribe(res =>{
            
        this.descriptiongroups = res;
    })        
  }

  getProfile() {      
    
    this.http.get<any>(this.authPath +'/whois/'+this.token).subscribe(res =>{
        
        this.whois = res;
    })        
  }
  
}