import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { StaffDialogComponent } from '../staff-dialog/staff-dialog.component';
import { WebService } from '../../../webService/web.service';
import { AlertService } from 'ngx-alerts';

@Component({
  selector: 'app-student-dialog',
  templateUrl: './student-dialog.component.html',
  styleUrls: ['./student-dialog.component.css']
})
export class StudentDialogComponent implements OnInit {

  myForm: FormGroup;
  role: string = 'student';
  isStudent: boolean = true;
  status: string = 'sendEmail';
  isActive: boolean = true;
  constructor( private fb: FormBuilder,private alertService: AlertService,private dialogRef: MatDialogRef<StaffDialogComponent>,private webService:WebService, @Inject(MAT_DIALOG_DATA) data) { 
    this.myForm = fb.group({
      'addDialog': fb.group({
        'name': ['',Validators.required],
        'email': ['',[Validators.required,          
        Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")
      ]]
    })
  

    });
  }

  ngOnInit() {
  }
  save() {
    const obj = this.myForm.value;
    obj.addDialog.isStudent = this.isStudent;
    obj.addDialog.role = this.role;
    obj.addDialog.status = this.status;
    obj.addDialog.isActive = this.isActive;
    obj.addDialog.qustions = [];
    obj.addDialog.testDuration = "";
    obj.addDialog.grade = "";
    this.webService.addStaffMember(obj).subscribe((res:any)=>{
      if(res.status == 200){
      this.dialogRef.close(obj.addDialog);
      }else{
        this.alertService.danger(`Error Occured: ${obj.addDialog.email} - ${res.message}`)
      }
    }) 
 }

close() {
    this.dialogRef.close();
}


}
