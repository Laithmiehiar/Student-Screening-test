import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WebService } from '../../../webService/web.service';
import { AlertService } from 'ngx-alerts';

@Component({
  selector: 'app-staff-dialog',
  templateUrl: './staff-dialog.component.html',
  styleUrls: ['./staff-dialog.component.css']
})
export class StaffDialogComponent implements OnInit {
  myForm: FormGroup;
  role: string = 'staff';
  isActive: boolean = true;

  constructor( private fb: FormBuilder,private alertService: AlertService,private dialogRef: MatDialogRef<StaffDialogComponent>,private webService:WebService, @Inject(MAT_DIALOG_DATA) data) { 
    this.myForm = fb.group({
      'addDialog': fb.group({
        'name': ['',Validators.required],
        'email': ['',[Validators.required,          
        Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")
      ]],
        'password': ['', Validators.required],
      })
  

    });
  }

  ngOnInit() {
  }

  save() {
    const obj = this.myForm.value;
    obj.addDialog.role = this.role;
    obj.addDialog.isActive = this.isActive;
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
