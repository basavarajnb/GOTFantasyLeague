import { Component, OnInit } from '@angular/core';
import { SessionService } from "app/services/session.service";
import { PlayerService } from "app/services/player.service";
import { UserService } from "app/services/user.service";

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


  selectedPlayersNames = [
    "Jon Snow",
    "Cersi Lan",
    "D Kalisi",
    "Arya",
    "Auron Greyjoy"
  ];

  constructor(private sessionService: SessionService,
    private playerService: PlayerService,
    private userService: UserService) {
  }

  ngOnInit() {
    this.subscription  =this.userService.$getUserDetailsSubj().subscribe((user) => {
      if (user) {
        this.user = user;
        console.log("DASHBOARD USER   ----> ", this.user);
        if (this.user.localSelectedPlayers && this.user.localSelectedPlayers.length > 0) {
          this.isDirty = this.userService.isUserTeamDirty;
          this.selectedPlayers = this.user.localSelectedPlayers;
          this.arePlayersSelected = true;
          console.log("arePlayersSelected -> ", this.selectedPlayers);
        }
      }
    });
  }
  closeInfobar() {
    this.showInfo = false;
  }

   ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
