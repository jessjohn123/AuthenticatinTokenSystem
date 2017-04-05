import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service';
//import { FlashMessagesService } from 'angular2-flash-messages'; 

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
   name: String;
   username: String;
   email: String;
   password: String;

  constructor(private vaidateService: ValidateService, /*public flashMessage: FlashMessagesService*/) { }

  ngOnInit() {
  }

  onRegisterSubmit(){
    const user = {
      name: this.name,
      username: this.username,
      email: this.email,
      password: this.password
    }

    //Required Fields
   if(!this.vaidateService.validateRegister(user)){
      //this.flashMessage.show('Please fill in all fields', {cssClass: 'alert-danger', timeout: 3000});
      console.log('Please fill in all fields');
      return false;
   }

   //Email Validate
    if(!this.vaidateService.validateEmail(user.email)){
      //this.flashMessage.show('Please use a valid email', {cssClass: 'alert-danger', timeout: 3000});
      console.log('Please use a valid email');
      return false;
   }
  }

}
