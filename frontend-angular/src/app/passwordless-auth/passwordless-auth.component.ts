import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WebService } from '../webService/web.service';
import { CommunicatorService } from '../webService/communicator.service';

@Component({
  selector: 'app-passwordless-auth',
  templateUrl: './passwordless-auth.component.html',
  styleUrls: ['./passwordless-auth.component.css']
})
export class PasswordlessAuthComponent implements OnInit {
  usertoken: string
  userid: string
  private sub: any
  constructor(private route: ActivatedRoute, private studentAuthService: WebService, private communicator: CommunicatorService, private router: Router) { }


  ngOnInit() {
  }

  startExam() {
    this.sub = this.route.params.subscribe(params => {
      this.usertoken = params['token']; // (+) converts string 'id' to a number


      this.studentAuthService.authStudent({ 'usertoken': this.usertoken }).
        subscribe((data: any) => {
          console.log(data)
          if (data.status == 200) {
            localStorage.setItem('usertoken',this.usertoken);
            this.communicator.serviceData = data.message;
            console.log(data)
            this.router.navigate(['/', 'student']);
          } else {
            this.router.navigate(['/', '/']);
          }


        });
    });

  }

}
