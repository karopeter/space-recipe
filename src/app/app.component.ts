import { Component, OnInit, Inject } from '@angular/core';
import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { AuthService } from './auth/auth.service';
import { LoggingService } from './logging.service';
import { Store } from '@ngrx/store';
import * as fromApp from './app.reducer';
import * as AuthActions from './auth/store/auth.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private loggingService: LoggingService,
    private store: Store<fromApp.AppState>,
    @Inject(PLATFORM_ID) private platformId: Object
    ) {}
   ngOnInit(): void {
     if (isPlatformBrowser(this.platformId)) {
      this.store.dispatch(new AuthActions.AutoLogin());
     }
    this.loggingService.printLog('Hello from the AppComponent ngOnInit');
   }
}
