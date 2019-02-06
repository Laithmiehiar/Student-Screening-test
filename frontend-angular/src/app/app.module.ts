import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AlertModule } from 'ngx-alerts';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { StaffComponent } from './staff/staff.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { AceEditorModule } from '../../node_modules/ng2-ace-editor';
import { AdminComponent } from './admin/admin.component'
import { NoPageFoundComponent } from './no-page-found/no-page-found.component'
import { PasswordlessAuthComponent } from './passwordless-auth/passwordless-auth.component';

import { UsersComponent } from './admin/users/users.component';
import { QuestionsComponent } from './admin/questions/questions.component';
import {MatButtonModule, MatCheckboxModule, MatFormFieldModule, MatTabsModule,MatSlideToggleModule,MatDialogModule,MatInputModule, MatSelectModule, MatFormFieldControl, MatIconModule} from '@angular/material';

import { BLockPassGuardFlatService } from './webService/b-lock-pass-guard--flat.service'
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptorService } from './webService/token-interceptor.service';
import { StudentComponent } from './student/student.component';
import { CommunicatorService } from './webService/communicator.service';

import { StaffDialogComponent } from './admin/users/staff-dialog/staff-dialog.component';
import { StudentDialogComponent } from './admin/users/student-dialog/student-dialog.component'
import { WebService } from './webService/web.service'

import { ReviewTestDirective } from './admin/users/review-test-dialog/review-test.directive';
import { ReviewTestDialogComponent } from './admin/users/review-test-dialog/review-test-dialog.component';
import { QuestionsTagsPipe } from './admin/questions/questions-tags.pipe';
import { AddQuestionDialogComponent } from './admin/questions/add-question-dialog/add-question-dialog.component'
import { TimerComponentComponent } from './timer-component/timer-component.component';

const routes: Routes = [
  {path: 'homex', component: AppComponent },
  {path: '', component: LoginPageComponent},
  {path: 'student', component: StudentComponent},
  {path: 'admin',  component: AdminComponent, children: [
    { path: 'users', component: UsersComponent},
    { path: 'questions', component: QuestionsComponent}
    ],canActivate: [BLockPassGuardFlatService]},
  {path: 'staff', component: StaffComponent,canActivate: [BLockPassGuardFlatService]},
  {path: 'passwordlessAuth/:token', component: PasswordlessAuthComponent},
  {path: 'student', component: StudentComponent },
  {path: '**', component: NoPageFoundComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    StaffComponent,
    LoginPageComponent,
    NoPageFoundComponent,
    PasswordlessAuthComponent,
    UsersComponent,
    QuestionsComponent,
    StudentComponent,
    NoPageFoundComponent,
    StaffDialogComponent,
    StudentDialogComponent,
    StudentComponent,
    NoPageFoundComponent,
    ReviewTestDirective,
    ReviewTestDialogComponent,
    AddQuestionDialogComponent,
    TimerComponentComponent,
    QuestionsTagsPipe
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AceEditorModule,
    MatButtonModule, MatCheckboxModule , MatTabsModule, MatFormFieldModule,MatSlideToggleModule,
    MatDialogModule,MatInputModule, MatSelectModule,MatIconModule,
     AlertModule.forRoot({maxMessages: 5, timeout: 5000, position: 'right'})

  ],

  providers: [BLockPassGuardFlatService, {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptorService,
    multi: true
  },WebService,
  CommunicatorService],
  bootstrap: [AppComponent],
  entryComponents: [StaffDialogComponent,StudentDialogComponent,ReviewTestDialogComponent,AddQuestionDialogComponent],
  exports: [QuestionsTagsPipe]
})
export class AppModule { }
