import { Component, OnInit } from '@angular/core';
import { useAnimation } from '@angular/animations';
import { WebService } from '../webService/web.service';


@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.css']
})
export class StaffComponent implements OnInit {

  constructor(private staffService:WebService) { }
  
  users :object

  ngOnInit() {
    this.staffService.getUsers()
    .subscribe((response) => this.users = response,
    (error) => console.log(error) ); 
  }
  
  sendMail(user){
    console.log(user)
    this.staffService.updateUser(user)
    .subscribe((response) => console.log(response),
    (error) => console.log(error) );
  }

  // onGet(){
  //   this.studentService.getUsers()
  //   .subscribe((response) => console.log(response),
  //   (error) => console.log(error) );
  // }
  
 
  // onSave(){
  //   this.studentService.addUser(this.user)
  //   .subscribe((response) => console.log(response),
  //   (error) => console.log(error) );
  // }

}
