import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { MAT_AUTOCOMPLETE_DEFAULT_OPTIONS } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class WebService {

  constructor(private http: HttpClient) { }


  login(userEmail, userPassword) {
    const user = { email: userEmail, password: userPassword };
    return this.http.post('http://localhost:3000/auth', user)
  }

  getAllUsers() {
    return this.http.get('http://localhost:3000/users/all/')
  }
  getUsersByRole(role) {
    return this.http.get('http://localhost:3000/users/role/', { params: role })
  }

  updateIsActivestatusByUserId(id, body) {
    const obj = { isActive: body }
    return this.http.patch(`http://localhost:3000/users/${id}`, obj)
  }

  findByIdAndRemove(id) {
    return this.http.delete(`http://localhost:3000/users/${id}`)
  }
  addStaffMember(_obj) {
    const obj = _obj.addDialog;
    return this.http.post('http://localhost:3000/users/', obj);
  }

  updateStudentGrade(id, _grade) {
    let obj;
    if (_grade < 50) {
      obj = { grade: _grade, status: 'Fail' }
    } else {
      obj = { grade: _grade, status: 'Pass' }
    }
    return this.http.patch(`http://localhost:3000/users/${id}`, obj)

  }

  addNewQuestion(obj) {
    return this.http.post('http://localhost:3000/questions/', obj);
  }

  getAllQuestions() {
    return this.http.get('http://localhost:3000/questions/')
  }

  deleteQuestionById(questionId) {
    return this.http.delete(`http://localhost:3000/questions/${questionId}`)
  }

  updateQuestion(questionId, obj) {
    return this.http.patch(`http://localhost:3000/questions/${questionId}`, obj)
  }

  getRandomQuestions(){
    return this.http.get('http://localhost:3000/questions/test/random')
  }
  
  authStudent(data) {
    return this.http.post('http://localhost:3000/student/auth', data)
  }
  getUsers() {
    // let token = JSON.parse(localStorage.getItem('usertoken'));
    // const headers = new HttpHeaders( {"x-auth-token":token})
    ///**********/ using TokenInterceptorService
    return this.http.get('http://localhost:3000/users/role/student')
  }

  updateUser(user) {
    let tmp = user;
    tmp.status = 'sent'
    return this.http.patch(`http://localhost:3000/users/student/${tmp._id}`, tmp)
  }

  questionScreeshot(id,studentAns){
console.log(studentAns)
    return this.http.patch(`http://localhost:3000/users/student/answer/${id}`, studentAns)
  }



}
