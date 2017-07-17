import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { FacebookService, LoginResponse, LoginOptions, AuthResponse, InitParams } from 'ngx-facebook';
import { Observable } from "rxjs/Observable";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import 'rxjs/add/observable/of';
import { User, UserKingdom } from "app/common/user";
import { AngularFireService } from "app/services/angularfire.service";


@Injectable()
export class UserService {
    user: any = {};
    userSubj = new BehaviorSubject<any>(undefined);
    isUserTeamDirty = false;

    constructor(private angularFireService: AngularFireService) {
        this.angularFireService.userSubj.subscribe((user) => {
            if (user) {
                this.setUserDetails(user);
            }
        });
    }

    getUserDetails() {
        return this.user;
    }
    $getUserDetailsSubj() {
        return this.userSubj;
    }

    setUserDetails(user) {
        this.user = user;
        if (this.user.currentSelectedPlayers && this.user.currentSelectedPlayers.length > 0) {
            this.user.localSelectedPlayers = this.user.currentSelectedPlayers;
        }
        this.userSubj.next(this.user);
    }

    setLocalSelectedPlayers(players) {
        if (this.user && players) {
            this.isUserTeamDirty = true;
            this.user.localSelectedPlayers = players;
            this.userSubj.next(this.user);
        }

    }
    getLocalSelectedPlayers() {
        return this.user.localSelectedPlayers
    }

    clearLocalChanges() {
        this.isUserTeamDirty = false;
        if (this.user.currentSelectedPlayers && this.user.currentSelectedPlayers.length > 0) {
            this.user.localSelectedPlayers = this.user.currentSelectedPlayers;
        }
        this.userSubj.next(this.user);
    }

    updateUserTeam(userTeamPlayers) {
        return this.angularFireService.updateUserTeam(userTeamPlayers);
    }
    removeUserTeam() {
        return this.angularFireService.removeUserTeam();
    }
}