import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { FacebookService, InitParams, LoginOptions } from 'ngx-facebook';
import { AngularFireDatabase, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';
import { SessionService } from "app/services/session.service";
import { AngularFireService } from "app/services/angularfire.service";
import { CharacterService } from "app/services/character.service";

export class Item {
  $key: string;
  title: string;
  body: string;
  timeStamp: Date;
  active: boolean = true;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';

  public isUserLoggedIn = false;
  private username = null;
  private imageUrl = "";
  
  private basePath: string = '/items';

  // user: Observable<firebase.User>;
  users: FirebaseListObservable<any[]>;
  item: FirebaseObjectObservable<any>;
  // msgVal: string = '';


  constructor(private fb: FacebookService,
    private router: Router,
    private sessionService: SessionService,
    private angularFireService: AngularFireService,
    private characterService: CharacterService) {
  }

  ngOnInit() {
    this.sessionService.fbInit();
    this.sessionService.logIn();
    this.sessionService.$loggedIn().subscribe((user) => {
      if (user) {
        this.loggedIn(user);
      }
      else {
        this.isUserLoggedIn = false;
      }
    });
  }

  loggedIn(user) {
    if (user) {
      // this.users = this.angularFireService.getUserList(); 
      // this.users.remove(user.id);
      // this.users.push(user.id);

      // Angular Fire
      this.angularFireService.registerUser(user);
      // this.angularFireService.createCharacterList();

      this.isUserLoggedIn = true;
      this.username = user.name;
      if (user.picture && user.picture.data && user.picture.data.url) {
        this.imageUrl = user.picture.data.url;
      }
    }
  }

  logout() {
    this.sessionService.logOut();
  }
}
