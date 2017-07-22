import { Component, OnInit } from '@angular/core';
import { AngularFireService } from "app/services/angularfire.service";
import { UserService } from "app/services/user.service";

class Episode {
  characterPoints: Array<any>;
  userPoints: Array<any>;
}

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.scss']
})
export class LeaderboardComponent implements OnInit {
  charactersList;
  usersList;
  currentUser;
  currentEpisode = "episode1";

  constructor(private angularFireService: AngularFireService,
    private userService: UserService) { }

  ngOnInit() {

    this.userService.$getUserDetailsSubj().subscribe((user) => {
      this.currentUser = this.userService.user;
    });

    this.angularFireService.getEpisodeData(this.currentEpisode).subscribe((episodeData: Episode) => {
      this.charactersList = episodeData.characterPoints;
      this.usersList = episodeData.userPoints;

    });
  }
}
