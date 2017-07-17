import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireService } from "app/services/angularfire.service";
import { UserService } from "app/services/user.service";

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


  private userTeamPlayers = [];
  public currentMode = TeamMode.add;

  private kingOrQueen = {};
  private theHand = {};
  private otherPlayers = [];

  private currentView = "grid";

  constructor(private router: Router,
    private userService: UserService) { }

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


  // selectedPlayersNames = [
  //   "Jon Snow",
  //   "Cersi Lan",
  //   "D Kalisi",
  //   "Arya",
  //   "Auron Greyjoy"
  // ];


  ngOnInit() {
  }

  addPlayers() {
    this.router.navigate(["/select-team"]);
  }

  editPlayers() {
    this.router.navigate(["/select-team"]);
  }

  savePlayers() {
    this.userService.updateUserTeam(this.userTeamPlayers).then(() => {
      alert("Team is Saved Successfully.");
      this.isDirty = false;
      this.userService.isUserTeamDirty = false;
    })
    .catch(() => {
      alert("Error occurred while saving the Team.");
    });
    }

  deletePlayers() {
    this.userService.removeUserTeam().then(() => {
      this.unsetDifferentPlayers();
      alert("Team is Deleted Successfully.")
    })
    .catch(() => {
      alert("Error occurred while deleting the Team.");
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
