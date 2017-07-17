import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { FacebookService, LoginResponse, LoginOptions, AuthResponse, InitParams } from 'ngx-facebook';
import { Observable } from "rxjs/Observable";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import 'rxjs/add/observable/of';
import { User, UserKingdom } from "app/common/user";
import { Character } from "app/common/character";
import { AngularFireService } from "app/services/angularfire.service";


@Injectable()
export class CharacterService {
    charactersList: Character[] = new Array<Character>();
    charactersSubj = new BehaviorSubject<any[]>([]);

    constructor(private angularFireService: AngularFireService) {
        this.angularFireService.getCharacterList().subscribe((response) => {
            console.log("Got the Characters ----->  ", response);
            this.charactersList = response;
            this.charactersSubj.next(this.charactersList);
        });
    }

    setCharacterList() {

    }

    getCharactersList() {
        return this.charactersList;
    }

    $getCharactersListSubj() {
        return this.charactersSubj;
    }
}