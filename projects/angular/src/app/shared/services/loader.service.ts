import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  private isLoading:any;

  constructor() { 
    this.isLoading=new BehaviorSubject(false);
  }

  changeLoadingState(isLoading:boolean){
    this.isLoading.next(isLoading);
  }
  getLoadingState(){
    return this.isLoading.asObservable()
    //.pipe(delay(100));
  }
}
