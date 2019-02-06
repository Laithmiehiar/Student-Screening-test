import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { TokenInterceptorService } from '../webService/token-interceptor.service';
import { CommunicatorService } from '../webService/communicator.service';
import { WebService } from '../webService/web.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {
  studentData: any;
  numOfQuestion: number;
  options: any = { maxLines: 1000, printMargin: false };
  subscription: Subscription;
  questions: any;
  currentQuestionIndex: number = 0;
  currentQuestion:number = 0;
  text:string = "";
  constructor(private router: Router, communicator: CommunicatorService, private webService: WebService) {
    this.studentData = communicator.serviceData;
    console.log(this.studentData);

  }

  ngOnInit() {
    const token = localStorage.getItem('usertoken');
    if (!token) {
      this.router.navigate(['/', '/']);
    }
    setTimeout(function () {
      localStorage.removeItem('usertoken');
    }, 20000 * 60)

    this.subscription = this.webService.getRandomQuestions().subscribe((res:any) => {
      console.log(res);
      this.questions = res;
      this.numOfQuestion = res.length;
      this.currentQuestion = this.questions[this.currentQuestionIndex];
    })
  }


  nextQuestion() {
    this.text = "";
    if(++this.currentQuestionIndex < this.numOfQuestion){
      this.currentQuestion =  this.questions[this.currentQuestionIndex];
    }
  }


  onChange(code) {
    console.log('qestionlist',this.questions);
     let questionObj = this.questions[this.currentQuestionIndex];
     console.log('questionObj',questionObj)
    let studentAns:Object={'question': questionObj.question, 'answer': code};
    this.subscription = this.webService.questionScreeshot(this.studentData._id,studentAns).subscribe((res:any) => {
      console.log(res);
    })
    }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
