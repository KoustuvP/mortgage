import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import { environment } from '../../environments/environment'
import { map, shareReplay, tap } from 'rxjs/operators'
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'projects/santander-angular/src/environments/environment';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';
import { CurrentUser } from '../model/CurrentUser'
import { NotificationService } from './notification.service';
import { LoaderService } from './loader.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isLoggedin:BehaviorSubject<boolean>=new BehaviorSubject<boolean>(false);
  private urlEndpoint:string;
  private token: string='';
  private subscription:any;
  private currentUser:CurrentUser=new CurrentUser('','','');
  private currentUserSubject:BehaviorSubject<CurrentUser>=new BehaviorSubject(this.currentUser);

  constructor(
    private http: HttpClient, 
    private router:Router, 
    private notificationService: 
    NotificationService,
    private loaderService: LoaderService
    ) { 
     this.urlEndpoint=environment.apiEndpoint;
    this.isLoggedin=new BehaviorSubject<boolean>(false);
  }

  authenticate (data: any) {

     this.subscription=this.http.post(`${environment.endpoint}/authenticate`,data).
     pipe(map(res => {
       this.setCurrentUser(res);
       return res;
    }),shareReplay())
     .subscribe(data=>{
      data?this.isLoggedin.next(true):this.isLoggedin.next(false); 
    });
  }

  setCurrentUser(user: any){
     this.currentUser=new CurrentUser(user.userId,user.firstName,user.lastName);
     this.currentUserSubject.next(this.currentUser)
     this.token=user?.jwt;
  }

  getCurrentUser=()=>this.currentUser;
  getCurrentUserSubscription=():Observable<CurrentUser>=>{
    return this.currentUserSubject.asObservable();
  }

  vs (){
      this.subscription.unsubscribe()
  }
   removeUser() {
        this.isLoggedin.next(false);
        this.setCurrentUser({firstName:'',lastName:'',userId:''})
        this.token='';
        this.router.navigate(['login'])
  }
  get authentication() : Observable<boolean>{
    return this.isLoggedin.asObservable();
  }
  getToken() {
    return this.token;
  }

  register(userData:any):any {
    return this.http.post(environment.endpoint+"/user-api/users/register",userData)
    .pipe(map(res=>{
      this.notificationService.setmessage("User has been successfully registered");
      this.loaderService.changeLoadingState(false);
      return res;
    }))
  }

}
