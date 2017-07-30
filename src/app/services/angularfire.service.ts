import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { FacebookService, LoginResponse, LoginOptions, AuthResponse, InitParams } from 'ngx-facebook';
import { Observable } from "rxjs/Observable";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import 'rxjs/add/observable/of';
import { User, UserKingdom } from "app/common/user";
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from "angularfire2/database";
import { UserService } from "app/services/user.service";


@Injectable()
export class AngularFireService {

    user: FirebaseObjectObservable<any>;
    users: FirebaseListObservable<any[]>;

    character: FirebaseObjectObservable<any>;
    characters: FirebaseListObservable<any[]>;

    userObject: any = {};
    userSubj = new BehaviorSubject<any>(undefined);
    charactersList: any = [];

    constructor(public db: AngularFireDatabase) {
        this.users = this.db.list('/users');
        this.characters = this.db.list('/characters');
    }

    getUserList() {
        return this.db.list('/users');
    }

    getUserObject(id) {
        return this.db.object('/users/' + id);
    }

    getUserById(id) {
        this.user = this.db.object('/users/' + id);
        return this.user;
    }
    setUserObject(id, tempUser) {
        this.db.object('/users/' + id).set(tempUser);
    }

    registerUser(user) {
        this.user = this.db.object('/users/' + user.id);
        this.user.subscribe((response) => {
            if (response.$exists() === false) {
                let tempUser: any = {};
                tempUser.id = user.id;
                tempUser.name = user.name ? user.name : "Anonymous";
                tempUser.email = user.email ? user.email : "";
                tempUser.gender = user.gender ? user.gender : "";
                tempUser.first_name = user.first_name ? user.name : "Anonymous";
                if (user.picture && user.picture.data && user.picture.data.url) {
                    tempUser.imageUrl = user.picture.data.url;
                }

                //Also include Rank and Points
                tempUser.rank = 0;
                tempUser.points = 0;

                this.user.set(tempUser);
                this.userObject = tempUser;

            }
            else {

                this.userObject = response;
            }
            this.userSubj.next(this.userObject);
        });

    }

    updateUserTeam(teamPlayers) {
        this.updatePrviousSelectedPlayers();
        return this.user.update({ currentSelectedPlayers: teamPlayers }).then(() => {
        });
    }
    removeUserTeam() {
        this.updatePrviousSelectedPlayers();
        return this.user.update({ currentSelectedPlayers: [] });
    }
    updatePrviousSelectedPlayers() {
        if (this.userObject && this.userObject.currentSelectedPlayers && this.userObject.currentSelectedPlayers.length > 0) {
            this.user.update({ previousSelectedPlayers: this.userObject.currentSelectedPlayers });
        }
    }

    copyUsersListTo(name, users) {
        this.db.object('/' + name).set(users);
    }



    // getTempUserList() {
    //     return this.db.list('/users');
    // }

    updateRankAndPoints(users) {
        if (users) {
            users.forEach(user => {
                if (user.id) {
                    this.db.object('/users/' + user.id).update({ rank: user.rank, points: user.points, totalPoints: user.totalPoints });
                }
            });
        }
    }

    saveEpisodeData(currentEpisodeName, currentEpisode) {
        return this.db.object('/episodes/' + currentEpisodeName).update(currentEpisode);
    }

    getEpisodeData(currentEpisode) {
        return this.db.object('/episodes/' + currentEpisode);
    }


    updateRankOfEachUser() {
        let abc = this.getUserList();
        abc.subscribe((users) => {
            users.forEach((user) => {
                user.id = user.$key;
                this.db.object('/users/' + user.id).update({ rank: 0 });
            });
        });
    }

    // updateRankOfEachUser() {
    //     let abc = this.getTempUserList();
    //     abc.subscribe((users) => {
    //         users.forEach((user) => {
    //             this.db.object('/users/' + user.id).set(user);
    //         });
    //     });
    // }

    // changeToArray() {
    //     this.user = this.db.object('/users/');
    //     let abc = this.getTempUserList();
    // }

    // abc() {
    //     let abcd = this.db.list('/users');
    //     abcd.map((user) => user.$key = user.id);
    //     var booksRef = this.db.database. ref.child("books");
    //     booksRef.child('Adam Freeman').set({
    //         title: "Pro AngularJS"
    //     }, onComplete);
    // }


    getCharacterList() {
        return this.db.list('/characters');
    }

    getCharacterObject(id) {
        return this.db.object('/characters/' + id);
    }
    setCharacterObject(id, tempUser) {
        this.db.object('/characters/' + id).set(tempUser);
    }

    getEpisodesSettings() {
        return this.db.object('/episodesSettings');
    }
    setEpisodesSettings(episodesSettings) {
        return this.db.object('/episodesSettings').set(episodesSettings);
    }
}