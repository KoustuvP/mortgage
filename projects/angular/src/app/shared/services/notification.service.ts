import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private notificationMessage:BehaviorSubject<string>;
  constructor() { 
    this.notificationMessage=new BehaviorSubject("");
  }
  setmessage(message: string) {
    this.notificationMessage.next(message);
  }

  getMessage():Observable<string> {
    // setTimeout(()=>{
    //   this.setmessage('');
    // },10000)
    return this.notificationMessage.asObservable();
  }
}
