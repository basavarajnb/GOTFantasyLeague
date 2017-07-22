import { Component, OnInit, OnDestroy } from '@angular/core';
import { AngularFireService } from "app/services/angularfire.service";
import { UserService } from "app/services/user.service";


class CategoryPoints {
  categoryID: string;
  category: string;
  points: number;
  desc: string;
}

class CharacterPoints {
  id: string;
  name: string;
  totalPoints: number;
  points: Array<CategoryPoints>;
}

class Episode {
  characterPoints: Array<CharacterPoints>;
  userPoints: Array<any>;
}

class PointsSystem {
  episode1: Array<CharacterPoints>;
}
@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit, OnDestroy {

  usersList: Array<any>;
  charactersList;
  private subscriptions;
  private currentEpisodeName = "episode1";
  private currentEpisode: Episode = new Episode();

  constructor(private angularFireService: AngularFireService,
    private userService: UserService) { }

  ngOnInit() {
    this.subscriptions = this.angularFireService.getUserList().subscribe((users) => {
      this.usersList = users;
      console.log("Users List -> ", this.usersList);

      // this.calculateCharacterPoints();
      this.charactersList = this.points_system[this.currentEpisodeName].sort(function (a, b) { return b.totalPoints - a.totalPoints });


      this.calculatePointsAndRanksOnTotalPoints();
      this.usersList.sort(function (a, b) { return b.points - a.points });

      console.log("Users List after calc -> ", this.usersList);

      let i = 0;
      let prevUserPoints = 999999999;
      this.usersList.forEach(user => {
        if (!isNaN(user.points)) {
          if (user.points !== prevUserPoints) {
            i++;
            prevUserPoints = user.points;
          }
          user.rank = i;
        }
      });

      // this.usersList.forEach((user) => {
      //   user.id = user.$key;
      // });
      // this.angularFireService.copyUsersListTo("temp-users", this.usersList);
    });
    // 10207674721024753 - dipen's ID
    // this.calculateAndReturnRanks().subscribe((users) => {
    //   this.usersList = users;
    //   console.log("Users List -> ", this.usersList);
    // });
    // this.angularFireService.updateRankOfEachUser();
  }

  updateRanks() {
    this.updateRankAndPoints(this.usersList);
  }

  saveEpisodeData() {
    this.currentEpisode.characterPoints = this.charactersList;
    this.currentEpisode.userPoints = this.usersList;
    console.log("this.currentEpisode -> ", this.currentEpisode);
    this.angularFireService.saveEpisodeData(this.currentEpisodeName, this.currentEpisode)
    .then(() => { alert("Data is Saved SucessFully");});
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  updateRankAndPoints(users) {
    this.angularFireService.updateRankAndPoints(users);
  }

  // Rank and Points
  calculatePointsAndRanksOnTotalPoints() {
    this.usersList.forEach(user => {
      if (user && user.currentSelectedPlayers) {
        let userPoints = 0;
        user.currentSelectedPlayers.forEach(character => {
          let char = this.charactersList.find(x => x.id === character.id);
          if (char && char.totalPoints) {
            userPoints = userPoints + char.totalPoints;
          }
        });
        user.points = userPoints;
      }
    });
  }

  calculateCharacterPoints() {
    this.points_system[this.currentEpisodeName].forEach(character => {
      let totalPoints = 0;
      if (character.points) {
        character.points.forEach(category => {
          if (category && category.points) {
            totalPoints = totalPoints + category.points;
          }
        });
      }
      character.totalPoints = totalPoints;
    });
  }
  private point_system = {
    episode1: [
      {
        id: "1001",
        name: "Jon Snow",  // Not required actually, but good to have
        totalPoints: 0,     // Can be calculated dynamically.
        points: [
          {
            categoryId: "1",     // Each main category in the point system - 1 - Power Points,  2 - Voilance Points,  3 - Character Points,  4 - Bold Points
            category: " Power Points",
            points: 20,
            desc: "Magic Use"   // Small description here. We can add breakdown page. where we detail how points are achieved.
          },
          {
            categoryId: "2",
            category: "Voilance Points",
            points: 10,
            desc: "Mass Random Kill, Memorable Kill"
          }
        ]
      },
      {
        id: "1002",
        name: "ccc",  // Not required actually, but good to have
        totalPoints: 0,     // Can be calculated dynamically.
        points: [
          {
            categoryId: "1",     // Each main category in the point system - 1 - Power Points,  2 - Voilance Points,  3 - Character Points,  4 - Bold Points
            category: " Power Points",
            points: 30,
            desc: "Magic Use"   // Small description here. We can add breakdown page. where we detail how points are achieved.
          },
          {
            categoryId: "2",
            category: "Voilance Points",
            points: 30,
            desc: "Mass Random Kill, Memorable Kill"
          }
        ]
      },
      {
        id: "1003",
        name: "ddd",  // Not required actually, but good to have
        totalPoints: 0,     // Can be calculated dynamically.
        points: [
          {
            categoryId: "1",     // Each main category in the point system - 1 - Power Points,  2 - Voilance Points,  3 - Character Points,  4 - Bold Points
            category: " Power Points",
            points: 40,
            desc: "Magic Use"   // Small description here. We can add breakdown page. where we detail how points are achieved.
          },
          {
            categoryId: "2",
            category: "Voilance Points",
            points: 40,
            desc: "Mass Random Kill, Memorable Kill"
          }
        ]
      }
    ],
  };

  private points_system: PointsSystem = {
    episode1: [
      {
        "id": "1001",
        "name": "Jon Snow",
        "totalPoints": 25,
        "points": [
          {
            "categoryID": "1",
            "category": "Power",
            "points": 0,
            "desc": ""
          },
          {
            "categoryID": "2",
            "category": "Violance",
            "points": 0,
            "desc": ""
          },
          {
            "categoryID": "3",
            "category": "Character",
            "points": 0,
            "desc": ""
          },
          {
            "categoryID": "4",
            "category": "Bold",
            "points": 0,
            "desc": ""
          }
        ]
      },
      {
        "id": "1002",
        "name": "Daenerys Targaryen",
        "totalPoints": 18,
        "points": [
          {
            "categoryID": "1",
            "category": "Power",
            "points": 0,
            "desc": ""
          },
          {
            "categoryID": "2",
            "category": "Violance",
            "points": 0,
            "desc": ""
          },
          {
            "categoryID": "3",
            "category": "Character",
            "points": 0,
            "desc": ""
          },
          {
            "categoryID": "4",
            "category": "Bold",
            "points": 0,
            "desc": ""
          }
        ]
      },
      {
        "id": "1003",
        "name": "Cersei Lannister",
        "totalPoints": 20,
        "points": [
          {
            "categoryID": "1",
            "category": "Power",
            "points": 0,
            "desc": ""
          },
          {
            "categoryID": "2",
            "category": "Violance",
            "points": 0,
            "desc": ""
          },
          {
            "categoryID": "3",
            "category": "Character",
            "points": 0,
            "desc": ""
          },
          {
            "categoryID": "4",
            "category": "Bold",
            "points": 0,
            "desc": ""
          }
        ]
      },
      {
        "id": "1004",
        "name": "Night King",
        "totalPoints": 0,
        "points": [
          {
            "categoryID": "1",
            "category": "Power",
            "points": 0,
            "desc": ""
          },
          {
            "categoryID": "2",
            "category": "Violance",
            "points": 0,
            "desc": ""
          },
          {
            "categoryID": "3",
            "category": "Character",
            "points": 0,
            "desc": ""
          },
          {
            "categoryID": "4",
            "category": "Bold",
            "points": 0,
            "desc": ""
          }
        ]
      },
      {
        "id": "1005",
        "name": "Sansa Stark",
        "totalPoints": 10,
        "points": [
          {
            "categoryID": "1",
            "category": "Power",
            "points": 0,
            "desc": ""
          },
          {
            "categoryID": "2",
            "category": "Violance",
            "points": 0,
            "desc": ""
          },
          {
            "categoryID": "3",
            "category": "Character",
            "points": 0,
            "desc": ""
          },
          {
            "categoryID": "4",
            "category": "Bold",
            "points": 0,
            "desc": ""
          }
        ]
      },
      {
        "id": "1006",
        "name": "Arya Stark",
        "totalPoints": 140,
        "points": [
          {
            "categoryID": "1",
            "category": "Power",
            "points": 0,
            "desc": ""
          },
          {
            "categoryID": "2",
            "category": "Violance",
            "points": 0,
            "desc": ""
          },
          {
            "categoryID": "3",
            "category": "Character",
            "points": 0,
            "desc": ""
          },
          {
            "categoryID": "4",
            "category": "Bold",
            "points": 0,
            "desc": ""
          }
        ]
      },
      {
        "id": "1007",
        "name": "Bran Stark",
        "totalPoints": 20,
        "points": [
          {
            "categoryID": "1",
            "category": "Power",
            "points": 0,
            "desc": ""
          },
          {
            "categoryID": "2",
            "category": "Violance",
            "points": 0,
            "desc": ""
          },
          {
            "categoryID": "3",
            "category": "Character",
            "points": 0,
            "desc": ""
          },
          {
            "categoryID": "4",
            "category": "Bold",
            "points": 0,
            "desc": ""
          }
        ]
      },
      {
        "id": "1008",
        "name": "Jamie Lannister",
        "totalPoints": 5,
        "points": [
          {
            "categoryID": "1",
            "category": "Power",
            "points": 0,
            "desc": ""
          },
          {
            "categoryID": "2",
            "category": "Violance",
            "points": 0,
            "desc": ""
          },
          {
            "categoryID": "3",
            "category": "Character",
            "points": 0,
            "desc": ""
          },
          {
            "categoryID": "4",
            "category": "Bold",
            "points": 0,
            "desc": ""
          }
        ]
      },
      {
        "id": "1009",
        "name": "Tyrion Lannister",
        "totalPoints": 10,
        "points": [
          {
            "categoryID": "1",
            "category": "Power",
            "points": 0,
            "desc": ""
          },
          {
            "categoryID": "2",
            "category": "Violance",
            "points": 0,
            "desc": ""
          },
          {
            "categoryID": "3",
            "category": "Character",
            "points": 0,
            "desc": ""
          },
          {
            "categoryID": "4",
            "category": "Bold",
            "points": 0,
            "desc": ""
          }
        ]
      },
      {
        "id": "1010",
        "name": "Euron Grejoy",
        "totalPoints": 15,
        "points": [
          {
            "categoryID": "1",
            "category": "Power",
            "points": 0,
            "desc": ""
          },
          {
            "categoryID": "2",
            "category": "Violance",
            "points": 0,
            "desc": ""
          },
          {
            "categoryID": "3",
            "category": "Character",
            "points": 0,
            "desc": ""
          },
          {
            "categoryID": "4",
            "category": "Bold",
            "points": 0,
            "desc": ""
          }
        ]
      },
      {
        "id": "1011",
        "name": "Bronn",
        "totalPoints": 0,
        "points": [
          {
            "categoryID": "1",
            "category": "Power",
            "points": 0,
            "desc": ""
          },
          {
            "categoryID": "2",
            "category": "Violance",
            "points": 0,
            "desc": ""
          },
          {
            "categoryID": "3",
            "category": "Character",
            "points": 0,
            "desc": ""
          },
          {
            "categoryID": "4",
            "category": "Bold",
            "points": 0,
            "desc": ""
          }
        ]
      },
      {
        "id": "1012",
        "name": "Melisandre",
        "totalPoints": 0,
        "points": [
          {
            "categoryID": "1",
            "category": "Power",
            "points": 0,
            "desc": ""
          },
          {
            "categoryID": "2",
            "category": "Violance",
            "points": 0,
            "desc": ""
          },
          {
            "categoryID": "3",
            "category": "Character",
            "points": 0,
            "desc": ""
          },
          {
            "categoryID": "4",
            "category": "Bold",
            "points": 0,
            "desc": ""
          }
        ]
      },
      {
        "id": "1013",
        "name": "Theon Greyjoy",
        "totalPoints": 0,
        "points": [
          {
            "categoryID": "1",
            "category": "Power",
            "points": 0,
            "desc": ""
          },
          {
            "categoryID": "2",
            "category": "Violance",
            "points": 0,
            "desc": ""
          },
          {
            "categoryID": "3",
            "category": "Character",
            "points": 0,
            "desc": ""
          },
          {
            "categoryID": "4",
            "category": "Bold",
            "points": 0,
            "desc": ""
          }
        ]
      },
      {
        "id": "1014",
        "name": "Yara Greyjoy",
        "totalPoints": 0,
        "points": [
          {
            "categoryID": "1",
            "category": "Power",
            "points": 0,
            "desc": ""
          },
          {
            "categoryID": "2",
            "category": "Violance",
            "points": 0,
            "desc": ""
          },
          {
            "categoryID": "3",
            "category": "Character",
            "points": 0,
            "desc": ""
          },
          {
            "categoryID": "4",
            "category": "Bold",
            "points": 0,
            "desc": ""
          }
        ]
      },
      {
        "id": "1015",
        "name": "Brienne",
        "totalPoints": 0,
        "points": [
          {
            "categoryID": "1",
            "category": "Power",
            "points": 0,
            "desc": ""
          },
          {
            "categoryID": "2",
            "category": "Violance",
            "points": 0,
            "desc": ""
          },
          {
            "categoryID": "3",
            "category": "Character",
            "points": 0,
            "desc": ""
          },
          {
            "categoryID": "4",
            "category": "Bold",
            "points": 0,
            "desc": ""
          }
        ]
      },
      {
        "id": "1016",
        "name": "Clegane",
        "totalPoints": 32,
        "points": [
          {
            "categoryID": "1",
            "category": "Power",
            "points": 0,
            "desc": ""
          },
          {
            "categoryID": "2",
            "category": "Violance",
            "points": 0,
            "desc": ""
          },
          {
            "categoryID": "3",
            "category": "Character",
            "points": 0,
            "desc": ""
          },
          {
            "categoryID": "4",
            "category": "Bold",
            "points": 0,
            "desc": ""
          }
        ]
      },
      {
        "id": "1017",
        "name": "Davos",
        "totalPoints": 0,
        "points": [
          {
            "categoryID": "1",
            "category": "Power",
            "points": 0,
            "desc": ""
          },
          {
            "categoryID": "2",
            "category": "Violance",
            "points": 0,
            "desc": ""
          },
          {
            "categoryID": "3",
            "category": "Character",
            "points": 0,
            "desc": ""
          },
          {
            "categoryID": "4",
            "category": "Bold",
            "points": 0,
            "desc": ""
          }
        ]
      },
      {
        "id": "1018",
        "name": "Jorah Mormont",
        "totalPoints": 0,
        "points": [
          {
            "categoryID": "1",
            "category": "Power",
            "points": 0,
            "desc": ""
          },
          {
            "categoryID": "2",
            "category": "Violance",
            "points": 0,
            "desc": ""
          },
          {
            "categoryID": "3",
            "category": "Character",
            "points": 0,
            "desc": ""
          },
          {
            "categoryID": "4",
            "category": "Bold",
            "points": 0,
            "desc": ""
          }
        ]
      },
      {
        "id": "1019",
        "name": "Grey Worm",
        "totalPoints": 0,
        "points": [
          {
            "categoryID": "1",
            "category": "Power",
            "points": 0,
            "desc": ""
          },
          {
            "categoryID": "2",
            "category": "Violance",
            "points": 0,
            "desc": ""
          },
          {
            "categoryID": "3",
            "category": "Character",
            "points": 0,
            "desc": ""
          },
          {
            "categoryID": "4",
            "category": "Bold",
            "points": 0,
            "desc": ""
          }
        ]
      },
      {
        "id": "1020",
        "name": "Tormund",
        "totalPoints": 5,
        "points": [
          {
            "categoryID": "1",
            "category": "Power",
            "points": 0,
            "desc": ""
          },
          {
            "categoryID": "2",
            "category": "Violance",
            "points": 0,
            "desc": ""
          },
          {
            "categoryID": "3",
            "category": "Character",
            "points": 0,
            "desc": ""
          },
          {
            "categoryID": "4",
            "category": "Bold",
            "points": 0,
            "desc": ""
          }
        ]
      },
      {
        "id": "1022",
        "name": "Missandei",
        "totalPoints": 0,
        "points": [
          {
            "categoryID": "1",
            "category": "Power",
            "points": 0,
            "desc": ""
          },
          {
            "categoryID": "2",
            "category": "Violance",
            "points": 0,
            "desc": ""
          },
          {
            "categoryID": "3",
            "category": "Character",
            "points": 0,
            "desc": ""
          },
          {
            "categoryID": "4",
            "category": "Bold",
            "points": 0,
            "desc": ""
          }
        ]
      },
      {
        "id": "1023",
        "name": "Petyr Baelish",
        "totalPoints": 0,
        "points": [
          {
            "categoryID": "1",
            "category": "Power",
            "points": 0,
            "desc": ""
          },
          {
            "categoryID": "2",
            "category": "Violance",
            "points": 0,
            "desc": ""
          },
          {
            "categoryID": "3",
            "category": "Character",
            "points": 0,
            "desc": ""
          },
          {
            "categoryID": "4",
            "category": "Bold",
            "points": 0,
            "desc": ""
          }
        ]
      },
      {
        "id": "1024",
        "name": "Varys",
        "totalPoints": 0,
        "points": [
          {
            "categoryID": "1",
            "category": "Power",
            "points": 0,
            "desc": ""
          },
          {
            "categoryID": "2",
            "category": "Violance",
            "points": 0,
            "desc": ""
          },
          {
            "categoryID": "3",
            "category": "Character",
            "points": 0,
            "desc": ""
          },
          {
            "categoryID": "4",
            "category": "Bold",
            "points": 0,
            "desc": ""
          }
        ]
      },
      {
        "id": "1025",
        "name": "Samwell Tarly",
        "totalPoints": 0,
        "points": [
          {
            "categoryID": "1",
            "category": "Power",
            "points": 0,
            "desc": ""
          },
          {
            "categoryID": "2",
            "category": "Violance",
            "points": 0,
            "desc": ""
          },
          {
            "categoryID": "3",
            "category": "Character",
            "points": 0,
            "desc": ""
          },
          {
            "categoryID": "4",
            "category": "Bold",
            "points": 0,
            "desc": ""
          }
        ]
      },
      {
        "id": "1021",
        "name": "Lyanna Mormont",
        "totalPoints": 15,
        "points": [
          {
            "categoryID": "1",
            "category": "Power",
            "points": 0,
            "desc": ""
          },
          {
            "categoryID": "2",
            "category": "Violance",
            "points": 0,
            "desc": ""
          },
          {
            "categoryID": "3",
            "category": "Character",
            "points": 0,
            "desc": ""
          },
          {
            "categoryID": "4",
            "category": "Bold",
            "points": 0,
            "desc": ""
          }
        ]
      },
      {
        "id": "1026",
        "name": "Ellaria Sand",
        "totalPoints": 0,
        "points": [
          {
            "categoryID": "1",
            "category": "Power",
            "points": 0,
            "desc": ""
          },
          {
            "categoryID": "2",
            "category": "Violance",
            "points": 0,
            "desc": ""
          },
          {
            "categoryID": "3",
            "category": "Character",
            "points": 0,
            "desc": ""
          },
          {
            "categoryID": "4",
            "category": "Bold",
            "points": 0,
            "desc": ""
          }
        ]
      },
      {
        "id": "1027",
        "name": "Ollena Tyrell",
        "totalPoints": 0,
        "points": [
          {
            "categoryID": "1",
            "category": "Power",
            "points": 0,
            "desc": ""
          },
          {
            "categoryID": "2",
            "category": "Violance",
            "points": 0,
            "desc": ""
          },
          {
            "categoryID": "3",
            "category": "Character",
            "points": 0,
            "desc": ""
          },
          {
            "categoryID": "4",
            "category": "Bold",
            "points": 0,
            "desc": ""
          }
        ]
      },
      {
        "id": "1028",
        "name": "Qyburn",
        "totalPoints": 0,
        "points": [
          {
            "categoryID": "1",
            "category": "Power",
            "points": 0,
            "desc": ""
          },
          {
            "categoryID": "2",
            "category": "Violance",
            "points": 0,
            "desc": ""
          },
          {
            "categoryID": "3",
            "category": "Character",
            "points": 0,
            "desc": ""
          },
          {
            "categoryID": "4",
            "category": "Bold",
            "points": 0,
            "desc": ""
          }
        ]
      }

    ]
  }

}
