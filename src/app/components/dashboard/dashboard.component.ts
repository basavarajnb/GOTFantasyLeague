import { Component, OnInit } from '@angular/core';
import { SessionService } from "app/services/session.service";
import { PlayerService } from "app/services/player.service";
import { UserService } from "app/services/user.service";

import { MdDialog, MdDialogRef } from '@angular/material';
import { NewUserDialogComponent } from "app/controls/dialogs/new-user-dialog/new-user-dialog.component";
import { CommonDialogComponent } from "app/controls/dialogs/common-dialog/common-dialog.component";


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public user;
  public selectedPlayers = [];
  public isDirty = false;
  private arePlayersSelected: boolean = false;
  public showInfo = false;
  message = "You cannot enter the team now!";

  private subscription;
  private dialogRef: MdDialogRef<CommonDialogComponent>;


  selectedPlayersNames = [
    "Jon Snow",
    "Cersi Lan",
    "D Kalisi",
    "Arya",
    "Auron Greyjoy"
  ];

  constructor(private sessionService: SessionService,
    private playerService: PlayerService,
    private userService: UserService,
    public dialog: MdDialog) {
  }

  ngOnInit() {
    this.subscription = this.userService.$getUserDetailsSubj().subscribe((user) => {
      if (user) {
        this.user = user;
        
        if (this.user.localSelectedPlayers && this.user.localSelectedPlayers.length > 0) {
          this.isDirty = this.userService.isUserTeamDirty;
          this.selectedPlayers = this.user.localSelectedPlayers;
          this.arePlayersSelected = true;
          
        }
        else {
          this.dialogRef = this.dialog.open(CommonDialogComponent, {
            data: "Add Players and SAVE TEAM after adding players.",
          });
        }
      }
    });
  }
  closeInfobar() {
    this.showInfo = false;
  }

  ngOnDestroy() {
    if (this.dialogRef) {
      this.dialogRef.close();
      this.dialog.closeAll();
    }
    this.subscription.unsubscribe();
  }
}
