import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { FacebookService, LoginResponse, LoginOptions, AuthResponse, InitParams } from 'ngx-facebook';
import { Observable } from "rxjs/Observable";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import 'rxjs/add/observable/of';

@Injectable()
export class SessionService {
    private loggedInSubject = new BehaviorSubject<any>(undefined);
    isUserLoggedIn: boolean = false;
    user: any;

    constructor(private fb: FacebookService, private router: Router) { }

    getUserDetails() {
        return this.user;
    }

    fbInit() {
        // Localhost 4600 - 455075384862999 
        // gotfantasyleague - 1593925954014511
        
        let initParams: InitParams = {
            appId: '1593925954014511',
            xfbml: true,
            version: 'v2.8'
        };
        this.fb.init(initParams);
    }

    $loggedIn() {
        return this.loggedInSubject;
    }

    getSessionDetails() {
        if (localStorage.getItem("userID")) {
            return true;
        }
        else {
            return false;
        }
    }

    setSessionDetails(userID) {
        localStorage.setItem("userID", userID);
    }

    clearSessionDetails() {
        localStorage.removeItem("userID");
    }

    logIn() {
        let userID = this.getSessionDetails();
        if (userID) {
            this.fbLogIn();
        }
    }

    fbLogIn() {
        let options: LoginOptions = {
            scope: 'public_profile,user_friends,email',
            return_scopes: true,
            enable_profile_selector: true
        };

        this.fb.login(options)
            .then((response) => {
                let userID = response.authResponse.userID;
                this.fb.api('/me?fields=id,name,first_name,gender,email,picture').then((user) => {
                    this.loggedIn(user);
                });
            })
            .catch((error: any) => {
                console.error(error);
            });
    }

    fbInitAndLogin() {
        this.fbInit();
        this.fbLogIn();
    }

    loggedIn(user) {
        this.user = user;
        this.isUserLoggedIn = true;
        this.loggedInSubject.next(user);
        this.setSessionDetails(user.id);
    }

    logOut() {
        this.fb.logout().then(() => {
            this.isUserLoggedIn = false;
            this.user = undefined;
            this.clearSessionDetails();
            this.loggedInSubject.next(undefined);
            this.router.navigate(['/']);
        });
    }
}