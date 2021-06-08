import { Component, OnInit, ComponentFactoryResolver, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService, AuthResponseData } from './auth.service';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AlertComponent } from '../shared/alert/alert.component';
import { PlaceholderDirective } from './../shared/placeholder/placeholder.directive';
import * as fromApp from '../app.reducer';
import * as AuthActions from './store/auth.actions';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit, OnDestroy {
   isLoginMode = true;
   error!: string;
   isLoading = false;
   @ViewChild(PlaceholderDirective) alertHost!: PlaceholderDirective;
   private closeSub!: Subscription;
  constructor(private authService: AuthService, private router: Router, private componentFactoryResolver: ComponentFactoryResolver, private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
    this.store.select('auth').subscribe(authState => {
       this.isLoading = authState.loading;
       this.error = authState.authError;
       if (this.error) {
         this.showErrorAlert(this.error);
       }
    });
  }

  onSwitchMode(): void {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm): void {
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;

    if (this.isLoginMode) {
      //  authObs = this.authService.login(email, password);
       this.store.dispatch(new AuthActions.LoginStart({email: email, password: password}));
    } else {
      // authObs = this.authService.signup(email, password);
      this.store.dispatch(new AuthActions.SignupStart({email: email, password: password}));
    }

    form.reset();
  }

  onHandleError(): void {
    this.error = null as any;
  }

  ngOnDestroy(): void {
    if (this.closeSub) {
      this.closeSub.unsubscribe();
    }
  }

  private showErrorAlert(message: string) {
    // const alertCmp = new AlertComponent();
    const alertCmpFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
    const hostViewContainerRef = this.alertHost.ViewContainerRef;
    hostViewContainerRef.clear();

    const componentRef = hostViewContainerRef.createComponent(alertCmpFactory);

    componentRef.instance.message = message;
    this.closeSub = componentRef.instance.close.subscribe(() => {
        this.closeSub.unsubscribe();
        hostViewContainerRef.clear();
    });
  }
}
