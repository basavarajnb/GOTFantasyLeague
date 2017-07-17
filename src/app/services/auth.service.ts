import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/observable/of';
import { SessionService } from "app/services/session.service";

@Injectable()
export class AuthService implements CanActivate {

    constructor(private router: Router,
    private sessionService: SessionService) { }

    accessToken = null;
    username = null;

    canActivate() {
        let userID =  this.sessionService.getSessionDetails();
        if (userID) {
                return Observable.of(true);
        }
        else {
            this.router.navigate(['/get-started']);
        }

    }

    login(data) {
        this.accessToken = data['authResponse']['accessToken'];
    }
}