import { Component, OnInit, AfterViewInit } from '@angular/core';
import { PlayerService } from "app/services/player.service";
import { Router } from '@angular/router';
import { CharacterService } from "app/services/character.service";
import { UserService } from "app/services/user.service";
import { MdDialog } from "@angular/material";
import { CommonDialogComponent } from "app/controls/dialogs/common-dialog/common-dialog.component";

@Component({
  selector: 'app-select-team',
  templateUrl: './select-team.component.html',
  styleUrls: ['./select-team.component.css']
})
export class SelectTeamComponent implements OnInit {

  private players: any[] = [];

  public levels = {
    level1: {
      level: 1,
      maxPlayers: 1,
      allPlayers: [],
      playersSelected: []
    },
    level2: {
      level: 2,
      maxPlayers: 1,
      allPlayers: [],
      playersSelected: []
    },
    level3: {
      level: 3,
      maxPlayers: 2,
      allPlayers: [],
      playersSelected: []
    },
    level4: {
      level: 4,
      maxPlayers: 1,
      allPlayers: [],
      playersSelected: []
    },
    level5: {
      level: 5,
      maxPlayers: 1,
      allPlayers: [],
      playersSelected: []
    },
  }

  constructor(private playerService: PlayerService,
    private router: Router,
    private characterService: CharacterService,
    private userService: UserService,
    public dialog: MdDialog) {
  }

  submit() {
    let expctedCount = this.levels.level1.maxPlayers +
      this.levels.level2.maxPlayers +
      this.levels.level3.maxPlayers +
      this.levels.level4.maxPlayers +
      this.levels.level5.maxPlayers;

    let selectedCount = this.levels.level1.playersSelected.length +
      this.levels.level2.playersSelected.length +
      this.levels.level3.playersSelected.length +
      this.levels.level4.playersSelected.length +
      this.levels.level5.playersSelected.length;

    if (selectedCount < expctedCount) {
      let alertMessage = "";
      if (this.levels.level1.maxPlayers != this.levels.level1.playersSelected.length) {
        alertMessage = alertMessage + (this.levels.level1.maxPlayers - this.levels.level1.playersSelected.length) + " Player from Level 1, ";
      }
      if (this.levels.level2.maxPlayers != this.levels.level2.playersSelected.length) {
        alertMessage = alertMessage + (this.levels.level2.maxPlayers - this.levels.level2.playersSelected.length) + " Player from Level 2, ";
      }
      if (this.levels.level3.maxPlayers != this.levels.level3.playersSelected.length) {
        alertMessage = alertMessage + (this.levels.level3.maxPlayers - this.levels.level3.playersSelected.length) + " Player(s) from Level 3, ";
      }
      if (this.levels.level4.maxPlayers != this.levels.level4.playersSelected.length) {
        alertMessage = alertMessage + (this.levels.level4.maxPlayers - this.levels.level4.playersSelected.length) + " Player from Level 4, ";
      }
      if (this.levels.level5.maxPlayers != this.levels.level5.playersSelected.length) {
        alertMessage = alertMessage + (this.levels.level5.maxPlayers - this.levels.level5.playersSelected.length) + " Player from Level 5, ";
      }

      let dialogRef = this.dialog.open(CommonDialogComponent, {
        data: "Before Submit, You have to select " + alertMessage,
      });
    }
    else {
      let players = [];
      players = players.concat(this.levels.level1.playersSelected);
      players = players.concat(this.levels.level2.playersSelected);
      players = players.concat(this.levels.level3.playersSelected);
      players = players.concat(this.levels.level4.playersSelected);
      players = players.concat(this.levels.level5.playersSelected);

      this.userService.setLocalSelectedPlayers(players);

      console.log("this.levels -> ", this.levels);
      this.router.navigate(["/dashboard"]);
    }
  }

  cancel() {
    this.router.navigate(["/dashboard"]);
  }

  ngOnInit() {
    this.characterService.$getCharactersListSubj().subscribe((players) => {
      this.players = players;
      console.log("SELECT TEAM:  this.players ->>>>>>>>> ", this.players);

      this.players.forEach((player) => {
        if (player) {
          if (player.level === 1) {
            this.levels.level1.allPlayers.push(player);
          } else if (player.level === 2) {
            this.levels.level2.allPlayers.push(player);
          } else if (player.level === 3) {
            this.levels.level3.allPlayers.push(player);
          } else if (player.level === 4) {
            this.levels.level4.allPlayers.push(player);
          } else if (player.level === 5) {
            this.levels.level5.allPlayers.push(player);
          }
        }
      });
      let alreadyselected = this.userService.getLocalSelectedPlayers();
      if (alreadyselected) {
        alreadyselected.forEach((player) => {
          if (player) {
            if (player.level === 1) {
              this.levels.level1.playersSelected.push(player);
            } else if (player.level === 2) {
              this.levels.level2.playersSelected.push(player);
            } else if (player.level === 3) {
              this.levels.level3.playersSelected.push(player);
            } else if (player.level === 4) {
              this.levels.level4.playersSelected.push(player);
            } else if (player.level === 5) {
              this.levels.level5.playersSelected.push(player);
            }
          }
        });
      }
    });
  }
  // players = [
  //   {
  //     id: "1001",
  //     level: 5,
  //     name: 'Jon Snow',
  //     img: './../../assets/images/jon-snow.jpg',
  //   },
  //   {
  //     id: "1002",
  //     level: 5,
  //     name: 'Daenerys Targaryen',
  //     img: './../../assets/images/daenerys.jpg',
  //   },
  //   {
  //     id: "1003",
  //     level: 5,
  //     name: 'Cersei Lannister',
  //     img: './../../assets/images/cersei.png',
  //   },
  //   {
  //     id: "1004",
  //     level: 5,
  //     name: 'Night King',
  //     img: './../../assets/images/night-king.png',
  //   },
  //   {
  //     id: "1005",
  //     level: 4,
  //     name: 'Sansa Stark',
  //     img: './../../assets/images/sansa.jpg',
  //   },
  //   {
  //     id: "1006",
  //     level: 4,
  //     name: 'Arya Stark',
  //     img: './../../assets/images/arya.jpg',
  //   },
  //   {
  //     id: "1007",
  //     level: 4,
  //     name: 'Bran Stark',
  //     img: './../../assets/images/Bran.jpg',
  //   },
  //   {
  //     id: "1008",
  //     level: 4,
  //     name: 'Jamie Lannister',
  //     img: './../../assets/images/jamie.jpg',
  //   },
  //   {
  //     id: "1009",
  //     level: 4,
  //     name: 'Tyrion Lannister',
  //     img: './../../assets/images/tyrion.jpg',
  //   },
  //   {
  //     id: "1010",
  //     level: 4,
  //     name: 'Euron Greyjoy',
  //     img: './../../assets/images/euron-greyjoy.jpg',
  //   },


  //   {
  //     id: "1011", level: 3,
  //     name: 'Bronn',
  //     img: './../../assets/images/bronn.jpg',
  //   },
  //   {
  //     id: "1012", level: 3,
  //     name: 'Melisandre',
  //     img: './../../assets/images/melisandre.jpg',
  //   },
  //   {
  //     id: "1013", level: 3,
  //     name: 'Theon Greyjoy',
  //     img: './../../assets/images/theon-greyjoy.jpg',
  //   },

  //   {
  //     id: "1014", level: 3,
  //     name: 'Yara Greyjoy',
  //     img: './../../assets/images/yara-greyjoy.jpg',
  //   },
  //   {
  //     id: "1015", level: 3,
  //     name: 'Brienne',
  //     img: './../../assets/images/brienne.jpg',
  //   },
  //   {
  //     id: "1016", level: 3,
  //     name: 'Hound',
  //     img: './../../assets/images/hound.jpg',
  //   },
  //   {
  //     id: "1017", level: 3,
  //     name: 'Davos',
  //     img: './../../assets/images/davos-seaworth.jpg',
  //   },
  //   {
  //     id: "1018", level: 3,
  //     name: 'Jorah Mormont',
  //     img: './../../assets/images/jorah-mormont.jpg',
  //   },
  //   {
  //     id: "1019", level: 3,

  //     name: 'Grey Worm',
  //     img: './../../assets/images/grey-worm.jpg',
  //   },
  //   {
  //     id: "1020", level: 3,
  //     name: 'Tormund',
  //     img: './../../assets/images/tormund.jpg',
  //   },





  //   {
  //     id: "1022", level: 2,
  //     name: 'Missandei',
  //     img: './../../assets/images/missandei.jpg',
  //   },

  //   {
  //     id: "1023", level: 2,

  //     name: 'Petyr Baelish',
  //     img: './../../assets/images/littlefinger.jpg',
  //   },
  //   {
  //     id: "1024", level: 2,

  //     name: 'Varys',
  //     img: './../../assets/images/varys.jpg',
  //   },

  //   {
  //     id: "1025", level: 2,
  //     name: 'Samwell Tarly',
  //     img: './../../assets/images/samwell-tarly.jpg',
  //   },



  //   {
  //     id: "1021", level: 1,
  //     name: 'Lyanna Mormont',
  //     img: './../../assets/images/lyanna.jpg',
  //   },

  //   {
  //     id: "1026", level: 1,

  //     name: 'Ellaria Sand',
  //     img: './../../assets/images/ellaria-sand.jpg',
  //   },
  //   {
  //     id: "1027", level: 1,
  //     name: 'Olenna Tyrell',
  //     img: './../../assets/images/olenna-tyrell.jpg',
  //   },

  //   {
  //     id: "1028", level: 1,
  //     name: 'Qyburn',
  //     img: './../../assets/images/qyburn.jpg',
  //   },
  // ];


}
