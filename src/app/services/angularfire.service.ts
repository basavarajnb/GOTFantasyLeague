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
    setUserObject(id, tempUser) {
        this.db.object('/users/' + id).set(tempUser);
    }

    registerUser(user) {
        this.user = this.db.object('/users/' + user.id);
        this.user.subscribe((response) => {
            if (response.$exists() === false) {
                let tempUser: any = {};
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
                console.log("New User is Registered :", tempUser);
            }
            else {
                console.log("User Already Exists :", response);
                this.userObject = response;
            }
            this.userSubj.next(this.userObject);
        });
        // this.item = this.angularFireService.getUserObject(user.id);
        // this.item.subscribe((abc) => {

        //     console.log("this.item From DB : ", abc);
        //     console.log("this.item From DB : ", abc.$exists());

        // });
    }

    updateUserTeam(teamPlayers) {
        console.log("Before : this.userObject", this.userObject);
        console.log("Before : this.teamPlayers", teamPlayers);
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


    getCharacterList() {
        return this.db.list('/characters');
    }

    getCharacterObject(id) {
        return this.db.object('/characters/' + id);
    }
    setCharacterObject(id, tempUser) {
        this.db.object('/characters/' + id).set(tempUser);
    }

    createCharacterList() {
        this.db.object('/characters').set(this.players);
    }


    // character

    players = [
        {
            id: "1001",
            level: 5,
            name: 'Jon Snow',
            img: './../../assets/images/jon-snow.jpg',
        },
        {
            id: "1002",
            level: 5,
            name: 'Daenerys Targaryen',
            img: './../../assets/images/daenerys.jpg',
        },
        {
            id: "1003",
            level: 5,
            name: 'Cersei Lannister',
            img: './../../assets/images/cersei.png',
        },
        {
            id: "1004",
            level: 5,
            name: 'Night King',
            img: './../../assets/images/night-king.png',
        },
        {
            id: "1005",
            level: 4,
            name: 'Sansa Stark',
            img: './../../assets/images/sansa.jpg',
        },
        {
            id: "1006",
            level: 4,
            name: 'Arya Stark',
            img: './../../assets/images/arya.jpg',
        },
        {
            id: "1007",
            level: 4,
            name: 'Bran Stark',
            img: './../../assets/images/Bran.jpg',
        },
        {
            id: "1008",
            level: 4,
            name: 'Jamie Lannister',
            img: './../../assets/images/jamie.jpg',
        },
        {
            id: "1009",
            level: 4,
            name: 'Tyrion Lannister',
            img: './../../assets/images/tyrion.jpg',
        },
        {
            id: "1010",
            level: 4,
            name: 'Euron Greyjoy',
            img: './../../assets/images/euron-greyjoy.jpg',
        },


        {
            id: "1011", level: 3,
            name: 'Bronn',
            img: './../../assets/images/bronn.jpg',
        },
        {
            id: "1012", level: 3,
            name: 'Melisandre',
            img: './../../assets/images/melisandre.jpg',
        },
        {
            id: "1013", level: 3,
            name: 'Theon Greyjoy',
            img: './../../assets/images/theon-greyjoy.jpg',
        },

        {
            id: "1014", level: 3,
            name: 'Yara Greyjoy',
            img: './../../assets/images/yara-greyjoy.jpg',
        },
        {
            id: "1015", level: 3,
            name: 'Brienne',
            img: './../../assets/images/brienne.jpg',
        },
        {
            id: "1016", level: 3,
            name: 'Hound',
            img: './../../assets/images/hound.jpg',
        },
        {
            id: "1017", level: 3,
            name: 'Davos',
            img: './../../assets/images/davos-seaworth.jpg',
        },
        {
            id: "1018", level: 3,
            name: 'Jorah Mormont',
            img: './../../assets/images/jorah-mormont.jpg',
        },
        {
            id: "1019", level: 3,

            name: 'Grey Worm',
            img: './../../assets/images/grey-worm.jpg',
        },
        {
            id: "1020", level: 3,
            name: 'Tormund',
            img: './../../assets/images/tormund.jpg',
        },





        {
            id: "1022", level: 2,
            name: 'Missandei',
            img: './../../assets/images/missandei.jpg',
        },

        {
            id: "1023", level: 2,

            name: 'Petyr Baelish',
            img: './../../assets/images/littlefinger.jpg',
        },
        {
            id: "1024", level: 2,

            name: 'Varys',
            img: './../../assets/images/varys.jpg',
        },

        {
            id: "1025", level: 2,
            name: 'Samwell Tarly',
            img: './../../assets/images/samwell-tarly.jpg',
        },



        {
            id: "1021", level: 1,
            name: 'Lyanna Mormont',
            img: './../../assets/images/lyanna.jpg',
        },

        {
            id: "1026", level: 1,

            name: 'Ellaria Sand',
            img: './../../assets/images/ellaria-sand.jpg',
        },
        {
            id: "1027", level: 1,
            name: 'Olenna Tyrell',
            img: './../../assets/images/olenna-tyrell.jpg',
        },

        {
            id: "1028", level: 1,
            name: 'Qyburn',
            img: './../../assets/images/qyburn.jpg',
        },
    ];
}