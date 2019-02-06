import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { WebService } from '../../webService/web.service';
import { Subscription } from 'rxjs';
import { AlertService } from 'ngx-alerts';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { AddQuestionDialogComponent } from './add-question-dialog/add-question-dialog.component'
@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {
  allquestions: any;
  subscription: Subscription;
  private dialogRef;

  constructor(private alertService: AlertService, private webService: WebService, private dialog: MatDialog) {  }

  ngOnInit() {
    //get all the questions
    this.getAllQuestions();
  }


  getAllQuestions() {
    this.subscription = this.webService.getAllQuestions().subscribe(
      (res: any) => {
        console.log(res);
        if (res.status == 200) {
          this.allquestions = res.message;
        }
      })
  }

  onDelete(question) {
    if (confirm("Are you sure")) {
    this.subscription = this.webService.deleteQuestionById(question._id).subscribe(
      (res: any) => {
        if (res.status == 200) {
          this.alertService.info("Questions has been deleted")
          this.ngOnInit();
        }
      }
    )
  }
  }
  onEdit(question){
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

      dialogConfig.data = {
        edit: true,
        question: question
    };   

   this.dialogRef = this.dialog.open(AddQuestionDialogComponent, dialogConfig);

    this.dialogRef.afterClosed().subscribe(
      (data) => {
        if (data) {
          this.alertService.info(`A question has been updated`);
          this.getAllQuestions();
        }
      }
    );

  }

  openDialog(){
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    //   dialogConfig.data = {
    //     id: 1,
    //     title: 'Angular For Beginners'
    // };   

   this.dialogRef = this.dialog.open(AddQuestionDialogComponent, dialogConfig);

    this.dialogRef.afterClosed().subscribe(
      (data) => {
        if (data) {
          this.alertService.info(`A new question has been added`);
          this.ngOnInit();
        }
      }
    );

  }


  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}


