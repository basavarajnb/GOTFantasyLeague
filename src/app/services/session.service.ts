import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { FacebookService, LoginResponse, LoginOptions, AuthResponse, InitParams } from 'ngx-facebook';
import { Observable } from "rxjs/Observable";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import 'rxjs/add/observable/of';
import { AngularFireService } from "app/services/angularfire.service";

@Injectable()
export class SessionService {
    private loggedInSubject = new BehaviorSubject<any>(undefined);
    isUserLoggedIn: boolean = false;
    user: any;

    constructor(private fb: FacebookService, private router: Router,
        private angularFireService: AngularFireService) { }

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
            return localStorage.getItem("userID");
        }
        else {
            return false;
        }
    }

    setSessionDetails(userID) {
        if (userID) {
            localStorage.setItem("userID", userID);
        }
    }

    clearSessionDetails() {
        localStorage.removeItem("userID");
    }

    logIn() {
        let userID = this.getSessionDetails();
        if (userID) {
            let userObs = this.angularFireService.getUserById(userID);
            userObs.subscribe((user) => {
                if (user && user.id) {
                    let tempUser: any = {};
                    tempUser.id = user.id;
                    tempUser.name = user.name ? user.name : "Anonymous";
                    tempUser.email = user.email ? user.email : "";
                    tempUser.gender = user.gender ? user.gender : "";
                    tempUser.imageUrl = user.imageUrl ? user.imageUrl : "";
                    tempUser.first_name = user.first_name ? user.first_name : "Anonymous";
                    tempUser.rank = user.rank ? user.rank : 0;
                    tempUser.points = user.points ? user.points : 0;
                    tempUser.points = user.totalPoints ? user.totalPoints : 0;
                    this.loggedIn(tempUser);
                }
                else {
                    this.clearSessionDetails();
                }
            });
            // this.fbLogIn();
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
                    console.log("Logged In User -> ", user);
                    user.id = userID;
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
        if (user) {
            this.user = user;
            this.isUserLoggedIn = true;
            if (user.id) {
                this.setSessionDetails(user.id);
            }
            this.loggedInSubject.next(user);
        }
    }

    logOut() {
        this.fb.getLoginStatus().then((response) => {
            if (response.status === 'connected') {
                this.fb.logout().then(() => {
                    this.eraseSessionAndLogout();
                });
            }
            else {
                this.eraseSessionAndLogout();
            }
        });
    }

    eraseSessionAndLogout() {
        this.isUserLoggedIn = false;
        this.user = undefined;
        console.log("User Logged Out");
        this.clearSessionDetails();
        this.loggedInSubject.next(undefined);
        this.router.navigate(['/']);
    }
}