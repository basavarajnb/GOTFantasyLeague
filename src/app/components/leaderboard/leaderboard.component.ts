import { Component, OnInit } from '@angular/core';
import { AngularFireService } from "app/services/angularfire.service";
import { UserService } from "app/services/user.service";
import { EpisodeService, Episode, EpisodesSettings } from "app/services/episode.service";

class EpisodePoints {
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
  episodesSettings: EpisodesSettings;
  episodeList: Array<Episode> = [];
  currentEpisodeId: string;

  constructor(private angularFireService: AngularFireService,
    private userService: UserService,
    private episodeService: EpisodeService) { }

  ngOnInit() {

    this.userService.$getUserDetailsSubj().subscribe((user) => {
      this.currentUser = this.userService.user;
    });

    this.episodeService.$getEpisodesSettingsSubj().subscribe((episodesSettings) => {
      if (episodesSettings) {
        this.episodesSettings = episodesSettings;
        this.episodeList = this.episodesSettings.episodes;
        this.currentEpisodeId = this.episodesSettings.currentEpisode.id;

        this.getCurrentEpisodeData(this.currentEpisodeId);
      }
    });
  }

  episodeChanged($event) {
    console.log("event", $event);
    if ($event) {
      this.getCurrentEpisodeData($event.value)
    }
  }

  getCurrentEpisodeData(currentEpisodeId) {
    this.angularFireService.getEpisodeData(currentEpisodeId).subscribe((episodeData: EpisodePoints) => {
      if (episodeData && episodeData.characterPoints && episodeData.userPoints) {
        this.charactersList = episodeData.characterPoints;
        this.usersList = episodeData.userPoints;
      }
      else {
        this.charactersList = [];
        this.usersList = [];
      }
    });
  }
}
