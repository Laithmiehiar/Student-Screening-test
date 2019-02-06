import { Component, OnInit } from '@angular/core';
import { AlertService } from 'ngx-alerts';
import { CommunicatorService } from '../webService/communicator.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  username: string;
  constructor(private alertService: AlertService,private dataService: CommunicatorService) { 

  }

  ngOnInit() {
    this.username = this.dataService.data
  }

}
