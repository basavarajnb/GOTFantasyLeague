import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MdDialogModule, MdButtonModule } from '@angular/material';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { HashLocationStrategy, Location, LocationStrategy } from '@angular/common';
import { routing } from './app.routing';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { GamePlayComponent } from './components/game-play/game-play.component';
import { PointsSystemComponent } from './components/points-system/points-system.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { LoginComponent } from './components/login/login.component';
import { AllianceComponent } from './components/alliance/alliance.component';
import { GetStartedComponent } from './components/get-started/get-started.component';

import { AuthService } from './services/auth.service';

import { FacebookModule } from 'ngx-facebook';
import { LeaderboardComponent } from './components/leaderboard/leaderboard.component';
import { SessionService } from "app/services/session.service";
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UserService } from "app/services/user.service";
import { SelectTeamComponent } from './components/select-team/select-team.component';
import { CollapseComponent } from "app/controls/collapse/collapse.component";
import { LevelPanelsComponent } from './components/select-team/level-panels/level-panels.component';
import { PlayerService } from "app/services/player.service";
import { UserTeamComponent } from './components/dashboard/user-team/user-team.component';
import { AngularFireService } from "app/services/angularfire.service";
import { CharacterService } from "app/services/character.service";
import { NewUserDialogComponent } from './controls/dialogs/new-user-dialog/new-user-dialog.component';
import { CommonDialogComponent } from './controls/dialogs/common-dialog/common-dialog.component';

export const firebaseConfig = {
  apiKey: "AIzaSyCctnc06-6uMKboihVzKOowBd7gpy1-TW0",
  authDomain: "gotfantasyleague-19332.firebaseapp.com",
  databaseURL: "https://gotfantasyleague-19332.firebaseio.com",
  projectId: "gotfantasyleague-19332",
  storageBucket: "",
  messagingSenderId: "365611527186"
};


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    GamePlayComponent,
    PointsSystemComponent,
    SignUpComponent,
    LoginComponent,
    AllianceComponent,
    GetStartedComponent,
    LeaderboardComponent,
    DashboardComponent,
    SelectTeamComponent,
    CollapseComponent,
    LevelPanelsComponent,
    UserTeamComponent,
    NewUserDialogComponent,
    CommonDialogComponent
  ],
  entryComponents: [
    NewUserDialogComponent,
    CommonDialogComponent
  ],
  imports: [
    BrowserModule,
    routing,
    FacebookModule.forRoot(),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    BrowserAnimationsModule,
    MdDialogModule,
    MdButtonModule,
  ],
  providers: [AuthService, SessionService, UserService, PlayerService, AngularFireService,
    CharacterService, Location,
    { provide: LocationStrategy, useClass: HashLocationStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
