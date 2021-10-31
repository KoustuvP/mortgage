import { AfterContentInit, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationStart, Router } from '@angular/router';
import { Idle, DEFAULT_INTERRUPTSOURCES, createDefaultInterruptSources } from '@ng-idle/core';
import { Keepalive } from '@ng-idle/keepalive';
import { Subscription } from 'rxjs';
import { CurrentUser } from './shared/model/CurrentUser';
import { AuthService } from './shared/services/auth.service';
import { LoaderService } from './shared/services/loader.service';
import { NotificationService } from './shared/services/notification.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'santander-angular';
  idleState = 'Not started.';
  showTimeOut = false;
  timedOut = false;
  lastPing?: Date;
  idleEndSubscription: any;
  idleStartSubscription: any;
  timeoutSubscription: any;
  timeoutWarningSubscription: any;
  keepaliveSubscription: any;
  routerSubscription: any;
  isLoading = false;
  userName='';

  constructor(
    private idle: Idle,
    private keepalive: Keepalive,
    private router: Router,
    private authService: AuthService,
    public notificationService: NotificationService,
    private loaderService: LoaderService,
    private ref: ChangeDetectorRef
  ) {

    this.authService.getCurrentUserSubscription().subscribe((user:CurrentUser)=>this.userName=user.firstName?user.firstName+" "+user.lastName:'')
    idle.setIdle(15);
    idle.setTimeout(15);
    idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);
    keepalive.interval(15);
    this.reset();
  }
  // ngAfterContentInit(): void {
  //   this.userName=this.authService.getCurrentUser()?.firstName+" "+this.authService.getCurrentUser()?.lastName
  // }
  ngOnDestroy(): void {
    this.idleEndSubscription.unsubscribe();
    this.idleStartSubscription.unsubscribe();
    this.timeoutSubscription.unsubscribe();
    this.timeoutWarningSubscription.unsubscribe();
    this.keepaliveSubscription.unsubscribe();
    this.routerSubscription.unsubscribe();

  }
  ngOnInit(): void {
    this.loaderService.getLoadingState().subscribe((data: boolean) => this.isLoading = data);
   
    // this.router.events.subscribe(event => {
      
    //   if (event instanceof NavigationStart)
    //     this.loaderService.changeLoadingState(true)
    //   if (event instanceof NavigationEnd)
    //     this.loaderService.changeLoadingState(false)
    //   if (event instanceof NavigationCancel){
    //     this.loaderService.changeLoadingState(false);
        
    //   }
    // })
    this.idleEndSubscription = this.idle.onIdleEnd.subscribe(() => {
      // this.idleState = 'No longer idle.'
      // this.idle.watch(false)
      // if(this.showTimeOut)
      // this.idle.clearInterrupts()
    });

    this.timeoutSubscription = this.idle.onTimeout.subscribe(() => {
      this.idleState = 'Timed out!';
      this.timedOut = true;
      this.showTimeOut = false;
      this.idle.setInterrupts(DEFAULT_INTERRUPTSOURCES)
      this.authService.removeUser();
    });

    this.idleStartSubscription = this.idle.onIdleStart.subscribe(() => {
      this.idleState = 'You\'ve gone idle!'
      this.showTimeOut = true;
    });

    this.timeoutWarningSubscription = this.idle.onTimeoutWarning.subscribe((countdown) => {
      if (this.showTimeOut)
        this.idle.clearInterrupts();
    });
    this.keepaliveSubscription = this.keepalive.onPing.subscribe(() => this.lastPing = new Date());
    this.routerSubscription = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        (event.url == '/login') ? this.idle.stop() : this.idle.watch()
      }
    })

  }

  reset() {
    this.idle.watch();
    this.idleState = 'Started.';
    this.timedOut = false;
    this.showTimeOut = false;
  }

  onContinue() {
    this.idle.setInterrupts(DEFAULT_INTERRUPTSOURCES)
    this.reset();
  }

  onLoggingOut() {
    this.idle.stop();
    this.showTimeOut = false;
    this.idle.setInterrupts(DEFAULT_INTERRUPTSOURCES)
    this.authService.removeUser();
  }
}
