import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireService } from "app/services/angularfire.service";
import { UserService } from "app/services/user.service";
import { CommonDialogComponent } from "app/controls/dialogs/common-dialog/common-dialog.component";
import { MdDialog } from "@angular/material";
import { EpisodeService } from "app/services/episode.service";

export enum TeamMode {
  view,
  edit,
  add
}
@Component({
  selector: 'app-user-team',
  templateUrl: './user-team.component.html',
  styleUrls: ['./user-team.component.css']
})
export class UserTeamComponent implements OnInit {
  @Input() set selectedPlayers(value) {
    this.userTeamPlayers = value;
    if (this.userTeamPlayers.length > 0) {
      this.currentMode = TeamMode.view;
      this.setDifferentPlayers(this.userTeamPlayers);
    }
  };

  @Input() isDirty: boolean;

  userMessage = "Note: Your Rank and Points are up to date.";
  showNote = true;


  private userTeamPlayers = [];
  public currentMode = TeamMode.add;

  public canSave = true;

  private kingOrQueen = {};
  private theHand = {};
  private otherPlayers = [];

  private currentView = "grid";

  constructor(private router: Router,
    private userService: UserService,
    public dialog: MdDialog,
    private episodeService: EpisodeService) { }

  tableView() {
    this.currentView = "table";
  }
  gridView() {
    this.currentView = "grid";
  }

  setDifferentPlayers(players: Array<any>) {
    this.userTeamPlayers = players.sort(function (a, b) { return b.level - a.level });
    this.userTeamPlayers.forEach((player) => {
      if (player.level === 5) {
        this.kingOrQueen = player;
      }
      else if (player.level === 4) {
        this.theHand = player;
      } else {
        if (!this.otherPlayers.find(x => x.id === player.id)) {
          this.otherPlayers.push(player);
        }
      }
    });
  }


  ngOnInit() {
    this.episodeService.$getDisableSaveSubj().subscribe((disableSave) => {
      this.canSave = !disableSave;
      if (!this.canSave) {
        this.userMessage = "Note: You can not Save or Edit team after the show airs. You can Save or Edit team after the points are assigned for current episode.";
      }
      else {
        this.userMessage = "Note: Your Rank and Points are up to date.";
      }
    });
    // this.episodeService.$getCurrentEpisodeSubj().subscribe((currentEpisode) => {
    //   let blockSaveDate = currentEpisode
    //   let d = new Date('2017-07-24T02:00:00Z'); // Fetch this from DB   2017-07-24T02:00:00Z
    //   if (d > new Date()) {
    //     this.canSave = true;
    //   }
    //   else {
    //     this.canSave = false;
    //   }
    // });
  }

  addPlayers() {
    this.router.navigate(["/select-team"]);
  }

  editPlayers() {
    this.router.navigate(["/select-team"]);
  }

  savePlayers() {
    this.canSave = !this.episodeService.getDisableSave();
    if (this.canSave) {
      this.userService.updateUserTeam(this.userTeamPlayers).then(() => {
        let dialogRef = this.dialog.open(CommonDialogComponent, {
          data: "Team is Saved Successfully.",
        });
        this.isDirty = false;
        this.userService.isUserTeamDirty = false;
      })
        .catch(() => {
          let dialogRef = this.dialog.open(CommonDialogComponent, {
            data: "Error occurred while saving the Team.",
          });
        });
    }
    else {
      this.userMessage = "Note: You can not Save or Edit team after the show airs. You can Save or Edit team after the points are assigned for current episode.";
    }
  }

  deletePlayers() {
    this.userService.removeUserTeam().then(() => {
      this.unsetDifferentPlayers();
      let dialogRef = this.dialog.open(CommonDialogComponent, {
        data: "Team is Deleted Successfully.",
      });
    })
      .catch(() => {
        let dialogRef = this.dialog.open(CommonDialogComponent, {
          data: "Error occurred while deleting the Team.",
        });
      });
  }

  clearChanges() {
    this.unsetDifferentPlayers();
    this.userService.clearLocalChanges();
  }

  unsetDifferentPlayers() {
    this.currentMode = TeamMode.add;
    this.userTeamPlayers = [];
    this.kingOrQueen = {};
    this.theHand = {};
    this.otherPlayers = [];
  }
}
