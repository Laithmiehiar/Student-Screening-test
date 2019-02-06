import { Component, OnInit, Inject } from '@angular/core';
import { MatSlideToggleChange, MatSlideToggle, MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig, MatTabChangeEvent } from '@angular/material';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AlertService } from 'ngx-alerts';
import { WebService } from '../../../webService/web.service';
import { StaffDialogComponent } from '../../users/staff-dialog/staff-dialog.component';


@Component({
  selector: 'app-add-question-dialog',
  templateUrl: './add-question-dialog.component.html',
  styleUrls: ['./add-question-dialog.component.css']
})
export class AddQuestionDialogComponent implements OnInit {
  myForm: FormGroup;
  _data: any;

  constructor(private fb: FormBuilder,private alertService: AlertService, private webService: WebService,private dialogRef: MatDialogRef<StaffDialogComponent>,@Inject(MAT_DIALOG_DATA) data) { 
    this.myForm = fb.group({
      'addQuestion': fb.group({
        'question': ['',Validators.required],
        'tags': ['',Validators.required]
      })
    })
    this._data = data;
    if (data.edit){
      this.myForm.get('addQuestion').get('question').setValue(data.question.question)
      this.myForm.get('addQuestion').get('tags').setValue(data.question.tags)

    }
  }

  save(){
    const obj = this.myForm.value;
    const newObj = {question: obj.addQuestion.question, tags: obj.addQuestion.tags.split(',')};
    console.log(newObj)
    this.webService.addNewQuestion(newObj).subscribe((res:any)=>{
      if(res.status == 200){
      this.dialogRef.close(newObj);
      }else{
        this.alertService.danger(`Error Occured: ${res.message}`)
      }
    }) 
  }

update(){
  const obj = this.myForm.get('addQuestion').value;
  const newObj = {question: obj.question, tags: obj.tags.split(',')};
  console.log(newObj)
  this.webService.updateQuestion(this._data.question._id ,newObj).subscribe((res:any)=>{
    if(res.status == 200){
    this.dialogRef.close(newObj);
    }else{
      this.alertService.danger(`Error Occured: ${res.message}`)
    }
  }) 
}
  ngOnInit() {
  }
close() {
    this.dialogRef.close();
}

}
