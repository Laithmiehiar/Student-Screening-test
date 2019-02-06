import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatTabChangeEvent } from '@angular/material';
import { WebService } from '../../../webService/web.service';
import { AlertService } from 'ngx-alerts';
import { StaffDialogComponent } from '../staff-dialog/staff-dialog.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-review-test-dialog',
  templateUrl: './review-test-dialog.component.html',
  styleUrls: ['./review-test-dialog.component.css']
})
export class ReviewTestDialogComponent implements OnInit {
  text: string = "";
  studentData: any;
  questions: any;
  displayedQuestion: string;
  tabIndex: number = 0;
  answerIndex: number = -1;
  displayedAnswer: string;
  numOfAnswers: number = 0;
  myForm: FormGroup;
  constructor(private fb: FormBuilder,private alertService: AlertService, private dialogRef: MatDialogRef<StaffDialogComponent>, private webService: WebService, @Inject(MAT_DIALOG_DATA) data) {
    this.studentData = data;
    this.questions = data.questions;
    this.displayedQuestion = this.getQuestion(this.tabIndex)
    this.numOfAnswers = this.questions[this.tabIndex].answers.length-1;
    this.getNextAnswer(this.tabIndex);

    this.myForm = fb.group({
      'evaluation' : fb.group({
        'grade': ['',Validators.compose([Validators.required, Validators.min(1),Validators.max(100)])],

      }) 
    })

  }

  ngOnInit() {
  }

  tabChanged(tabChangeEvent: MatTabChangeEvent) {
    if(tabChangeEvent.index != 3){
    this.displayedQuestion = this.getQuestion(tabChangeEvent.index)
    this.answerIndex = -1;
    this.numOfAnswers = this.questions[tabChangeEvent.index].answers.length-1;
    this.getNextAnswer(tabChangeEvent.index)
  }
    this.tabIndex = tabChangeEvent.index;
  }

  save() {
    const obj = this.myForm.get('evaluation').get('grade').value;
    this.webService.updateStudentGrade(this.studentData._id,obj).subscribe((res: any) => {
      if (res.status == 200) {
        this.dialogRef.close(obj);
      } else {
        this.alertService.danger(`Error Occured: ${obj} - ${res.message}`)
      }
    })
  }

  close() {
    this.dialogRef.close();
  }

  getQuestion(questionNumber) {
    return this.questions[questionNumber].question;
  }

  getNextAnswer(forQuestionIndex = this.tabIndex) {
    if (this.answerIndex < this.numOfAnswers) {
      console.log(this.numOfAnswers)
      console.log(this.answerIndex)
      console.log(this.answerIndex < this.numOfAnswers)

      const arr = this.questions[forQuestionIndex].answers
      const val = arr[++this.answerIndex]
      this.displayedAnswer = val;
    }
  }
  getPrevAnswer(forQuestionIndex=this.tabIndex) {
    if (this.answerIndex > 0) {
      const arr = this.questions[forQuestionIndex].answers
      const val = arr[--this.answerIndex]
      this.displayedAnswer = val
    }
  }

}
