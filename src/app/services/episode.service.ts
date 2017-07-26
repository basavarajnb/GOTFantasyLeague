import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { FacebookService, LoginResponse, LoginOptions, AuthResponse, InitParams } from 'ngx-facebook';
import { Observable } from "rxjs/Observable";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import 'rxjs/add/observable/of';
import { User, UserKingdom } from "app/common/user";
import { AngularFireService } from "app/services/angularfire.service";

export class Episode {
    id: string;
    label: string;
    name: string;
    releaseDate: string;
    description: string;
    isUpdated: boolean;
}

export class EpisodesSettings {
    episodes: Array<Episode>;
    currentEpisode: Episode;
    disableSave: boolean;
}

@Injectable()
export class EpisodeService {
    currentEpisode: Episode;
    disableSave: boolean;
    episodesSettings: EpisodesSettings;

    disableSaveSubj = new BehaviorSubject<boolean>(false);
    currentEpisodeSubj = new BehaviorSubject<Episode>(undefined);
    episodesSettingsSubj = new BehaviorSubject<EpisodesSettings>(undefined);

    constructor(private angularFireService: AngularFireService) {
        this.angularFireService.getEpisodesSettings().subscribe((episodesSettings) => {
            this.setEpisodeSettings(episodesSettings);
        });
    }
    setEpisodeSettings(episodesSettings: EpisodesSettings) {
        if (episodesSettings && episodesSettings.episodes && episodesSettings.episodes.length > 0) {
            this.disableSave = episodesSettings.disableSave;
            this.disableSaveSubj.next(episodesSettings.disableSave);
            this.episodesSettings = episodesSettings;
            this.episodesSettingsSubj.next(this.episodesSettings);
            this.currentEpisodeSubj.next(this.episodesSettings.currentEpisode);
        }
    }

    getDisableSave() {
        return this.disableSave;
    }

    $getDisableSaveSubj() {
        return this.disableSaveSubj;
    }

    getCurrentEpisode() {
        return this.currentEpisode;
    }

    $getCurrentEpisodeSubj() {
        return this.currentEpisodeSubj;
    }

    getEpisodesSettings() {
        return this.episodesSettings;
    }
    $getEpisodesSettingsSubj() {
        return this.episodesSettingsSubj;
    }

    getEpisodesList() {
        if (this.episodesSettings.episodes) {
            this.episodesSettings.episodes
        }
        else {
            return [];
        }
    }

    // For adding DB Data;
    episodesSettingsTEMP = new EpisodesSettings();
    addEpisodesSettingsTEMP() {
        this.episodesSettingsTEMP.episodes = this.episodesTemp;
        this.episodesSettingsTEMP.currentEpisode = this.episodesTemp[2];
        this.episodesSettingsTEMP.disableSave = false;

        this.angularFireService.setEpisodesSettings(this.episodesSettingsTEMP);
    }
    episodesTemp: Array<Episode> = [
        {
            id: "episode1",
            label: "Episode 01",
            name: "Dragonstone",
            releaseDate: "2017-07-17T02:00:00Z",
            description: "",
            isUpdated: true,
        },
        {
            id: "episode2",
            label: "Episode 02",
            name: "Stormborn",
            releaseDate: "2017-07-24T02:00:00Z",
            description: "",
            isUpdated: true,
        },
        {
            id: "episode3",
            label: "Episode 03",
            name: "The Queen's Justice",
            releaseDate: "2017-07-31T02:00:00Z",
            description: "",
            isUpdated: false,
        },
        {
            id: "episode4",
            label: "Episode 04",
            name: "The Spoils of War",
            releaseDate: "2017-08-07T02:00:00Z",
            description: "",
            isUpdated: false,
        },
        {
            id: "episode5",
            label: "Episode 05",
            name: "TBA",
            releaseDate: "2017-08-14T02:00:00Z",
            description: "",
            isUpdated: false,
        },
        {
            id: "episode6",
            label: "Episode 06",
            name: "TBA",
            releaseDate: "2017-08-21T02:00:00Z",
            description: "",
            isUpdated: false,
        },
        {
            id: "episode7",
            label: "Episode 07",
            name: "TBA",
            releaseDate: "2017-08-28T02:00:00Z",
            description: "",
            isUpdated: false,
        }
    ];

    // End
}