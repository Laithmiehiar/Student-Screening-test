import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommunicatorService {
  serviceData: any = null;

  constructor() { }

  get data():any { 
    return this.serviceData; 
  } 
  set data(value: any) { 
    this.serviceData = value; 
  } 
}
