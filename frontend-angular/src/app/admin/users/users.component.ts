import { Component, OnInit, Pipe } from '@angular/core';
import { WebService } from '../../webService/web.service';
import { MatSlideToggleChange, MatSlideToggle, MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig, MatTabChangeEvent } from '@angular/material';
import { Subscriber, Subscription } from 'rxjs';
import { AlertService } from 'ngx-alerts';
import { StaffDialogComponent } from './staff-dialog/staff-dialog.component'
import { StudentDialogComponent } from './student-dialog/student-dialog.component';
import { ReviewTestDialogComponent } from './review-test-dialog/review-test-dialog.component';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  private tabIndex: number=0 ;
  private allusers: any;
  private staff;
  private students;
  private dialogRef;

  constructor(private webService: WebService, private alertService: AlertService, private dialog: MatDialog) { }
  private subscription: Subscription;
  ngOnInit() {
    this.subscription = this.webService.getAllUsers().subscribe((data) => {
      this.allusers = data
      this.staff = this.allusers.filter(this.isStaff);
      this.students = this.allusers.filter(this.isStudent)
    })
  }

  isStaff(element, index, array) {
    return element.role === 'staff'
  }

  isStudent(element, index, array) {
    return element.role === 'student'
  }

  onStatusChange(ob: MatSlideToggleChange, obj) {
    if (ob.checked) {
      this.subscription = this.webService.updateIsActivestatusByUserId(obj._id, true).subscribe((res: any) => {
        if (res.status == 200) {
          this.alertService.warning(`${obj.name} is now active`)
        }
      })
    } else {
      this.subscription = this.webService.updateIsActivestatusByUserId(obj._id, false).subscribe((res: any) => {
        if (res.status == 200) {
          this.alertService.warning(`${obj.name} is now inactive`)
        }
      })

    }
  }

  onDelete(obj) {
    if (confirm("Are you sure")) {
      this.subscription = this.webService.findByIdAndRemove(obj._id).subscribe(
      (res:any) => {
          if(res.status == 200){
          this.alertService.info(`${obj.name} has been removed`)
          this.ngOnInit();
          }else{
            this.alertService.danger(`Error Occured: ${res.message}`)

          }
        }
      )
    } else {
      console.log("You pressed Cancel!");
    }

  }

  onEdit() {

  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  tabChanged(tabChangeEvent: MatTabChangeEvent) {
    this.tabIndex = tabChangeEvent.index;
  }

  openDialog() {
    console.log(this.tabIndex);
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    //   dialogConfig.data = {
    //     id: 1,
    //     title: 'Angular For Beginners'
    // };   

    if (this.tabIndex === 0) {
      this.dialogRef = this.dialog.open(StaffDialogComponent, dialogConfig);
    } else {
      this.dialogRef = this.dialog.open(StudentDialogComponent, dialogConfig);

    }
    this.dialogRef.afterClosed().subscribe(
      (data) => {
        if (data) {
          this.alertService.info(`${data.name} has been added`);
          this.ngOnInit();
        }
      }
    );

  }

  openReviewTestDialog(studentData){
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

         dialogConfig.data = studentData

      this.dialogRef = this.dialog.open(ReviewTestDialogComponent, dialogConfig);

    this.dialogRef.afterClosed().subscribe(
      (data) => {
          console.log(data)
          this.alertService.info(`Grade has been updated`);
          this.ngOnInit();
        
      }
    );
  }

}
