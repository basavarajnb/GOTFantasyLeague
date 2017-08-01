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
}

class Episode {
  characterPoints: Array<CharacterPoints>;
  userPoints: Array<any>;
}

class PointsSystem {
  episode1: Array<CharacterPoints>;
  episode2: Array<CharacterPoints>;
  episode3: Array<CharacterPoints>;
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
  private currentEpisodeName = "episode3";
  private currentEpisode: Episode = new Episode();

  constructor(private angularFireService: AngularFireService,
    private userService: UserService) { }

  ngOnInit() {
    this.subscriptions = this.angularFireService.getUserList().subscribe((users) => {
      this.usersList = users;
      console.log("Users List -> ", this.usersList);

      // this.calculateCharacterPoints();
      this.charactersList = this.points_system[this.currentEpisodeName].sort(function (a, b) { return b.totalPoints - a.totalPoints });
      this.usersList.sort(function (a, b) { return b.points - a.points });



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
      .then(() => { alert("Data is Saved SucessFully"); });
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  updateRankAndPoints(users) {
    let usersClone = JSON.parse(JSON.stringify(users))
    console.log("UsersClone-> ", usersClone);

    this.angularFireService.updateRankAndPoints(usersClone);
  }

  // Rank and Points
  calculatePointsAndRanksOnTotalPoints() {
    this.usersList.forEach(user => {
      if (user && user.currentSelectedPlayers) {
        let userPoints = 0;
        let totalPoints = user.totalPoints? user.totalPoints : 0;
        user.currentSelectedPlayers.forEach(character => {
          let char = this.charactersList.find(x => x.id === character.id);
          if (char && char.totalPoints) {
            userPoints = userPoints + char.totalPoints;
            totalPoints = totalPoints + char.totalPoints;
          }
        });
        user.points = userPoints;
        user.totalPoints = totalPoints;
      }
      else {
        // In Case there old user has deleted the team and has no team now.
        user.points = 0;
        if (!user.totalPoints) {
          user.totalPoints = 0;
        }
      }
    });

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

  private points_system: PointsSystem = {
    episode1: [
      {
        "id": "1001",
        "name": "Jon Snow",
        "totalPoints": 25
      },
      {
        "id": "1002",
        "name": "Daenerys Targaryen",
        "totalPoints": 18,
      },
      {
        "id": "1003",
        "name": "Cersei Lannister",
        "totalPoints": 20,
      },
      {
        "id": "1004",
        "name": "Night King",
        "totalPoints": 0,
      },
      {
        "id": "1005",
        "name": "Sansa Stark",
        "totalPoints": 10,
      },
      {
        "id": "1006",
        "name": "Arya Stark",
        "totalPoints": 140,
      },
      {
        "id": "1007",
        "name": "Bran Stark",
        "totalPoints": 20,
      },
      {
        "id": "1008",
        "name": "Jamie Lannister",
        "totalPoints": 5,
      },
      {
        "id": "1009",
        "name": "Tyrion Lannister",
        "totalPoints": 10,
      },
      {
        "id": "1010",
        "name": "Euron Grejoy",
        "totalPoints": 15,
      },
      {
        "id": "1011",
        "name": "Bronn",
        "totalPoints": 0,
      },
      {
        "id": "1012",
        "name": "Melisandre",
        "totalPoints": 0,
      },
      {
        "id": "1013",
        "name": "Theon Greyjoy",
        "totalPoints": 0,
      },
      {
        "id": "1014",
        "name": "Yara Greyjoy",
        "totalPoints": 0,
      },
      {
        "id": "1015",
        "name": "Brienne",
        "totalPoints": 0,
      },
      {
        "id": "1016",
        "name": "Clegane",
        "totalPoints": 32,
      },
      {
        "id": "1017",
        "name": "Davos",
        "totalPoints": 0,
      },
      {
        "id": "1018",
        "name": "Jorah Mormont",
        "totalPoints": 0,
      },
      {
        "id": "1019",
        "name": "Grey Worm",
        "totalPoints": 0,
      },
      {
        "id": "1020",
        "name": "Tormund",
        "totalPoints": 5,
      },
      {
        "id": "1022",
        "name": "Missandei",
        "totalPoints": 0,
      },
      {
        "id": "1023",
        "name": "Petyr Baelish",
        "totalPoints": 0,
      },
      {
        "id": "1024",
        "name": "Varys",
        "totalPoints": 0,
      },
      {
        "id": "1025",
        "name": "Samwell Tarly",
        "totalPoints": 0,
      },
      {
        "id": "1021",
        "name": "Lyanna Mormont",
        "totalPoints": 15,
      },
      {
        "id": "1026",
        "name": "Ellaria Sand",
        "totalPoints": 0,
      },
      {
        "id": "1027",
        "name": "Ollena Tyrell",
        "totalPoints": 0,
      },
      {
        "id": "1028",
        "name": "Qyburn",
        "totalPoints": 0,
      }

    ],
    episode2: [
      {
        "id": "1001",
        "name": "Jon Snow",
        "totalPoints": 40,
      },
      {
        "id": "1002",
        "name": "Daenerys Targaryen",
        "totalPoints": 45,
      },
      {
        "id": "1003",
        "name": "Cersei Lannister",
        "totalPoints": 20,
      },
      {
        "id": "1004",
        "name": "Night King",
        "totalPoints": 0,
      },
      {
        "id": "1005",
        "name": "Sansa Stark",
        "totalPoints": 20,
      },
      {
        "id": "1006",
        "name": "Arya Stark",
        "totalPoints": 25,
      },
      {
        "id": "1007",
        "name": "Bran Stark",
        "totalPoints": 0,
      },
      {
        "id": "1008",
        "name": "Jamie Lannister",
        "totalPoints": 10,
      },
      {
        "id": "1009",
        "name": "Tyrion Lannister",
        "totalPoints": 15,
      },
      {
        "id": "1010",
        "name": "Euron Grejoy",
        "totalPoints": 172,
      },
      {
        "id": "1011",
        "name": "Bronn",
        "totalPoints": 0,
      },
      {
        "id": "1012",
        "name": "Melisandre",
        "totalPoints": 5,
      },
      {
        "id": "1013",
        "name": "Theon Greyjoy",
        "totalPoints": 40,
      },
      {
        "id": "1014",
        "name": "Yara Greyjoy",
        "totalPoints": 75,
      },
      {
        "id": "1015",
        "name": "Brienne",
        "totalPoints": 0,
      },
      {
        "id": "1016",
        "name": "Clegane",
        "totalPoints": 0,
      },
      {
        "id": "1017",
        "name": "Davos",
        "totalPoints": 5,
      },
      {
        "id": "1018",
        "name": "Jorah Mormont",
        "totalPoints": 0,
      },
      {
        "id": "1019",
        "name": "Grey Worm",
        "totalPoints": 30,
      },
      {
        "id": "1020",
        "name": "Tormund",
        "totalPoints": 0,
      },
      {
        "id": "1022",
        "name": "Missandei",
        "totalPoints": 30,
      },
      {
        "id": "1023",
        "name": "Petyr Baelish",
        "totalPoints": 0,
      },
      {
        "id": "1024",
        "name": "Varys",
        "totalPoints": 10,
      },
      {
        "id": "1025",
        "name": "Samwell Tarly",
        "totalPoints": 12,
      },
      {
        "id": "1021",
        "name": "Lyanna Mormont",
        "totalPoints": 15,
      },
      {
        "id": "1026",
        "name": "Ellaria Sand",
        "totalPoints": 15,
      },
      {
        "id": "1027",
        "name": "Ollena Tyrell",
        "totalPoints": 20,
      },
      {
        "id": "1028",
        "name": "Qyburn",
        "totalPoints": 5,
      }

    ],
     episode3: [
      {
        "id": "1001",
        "name": "Jon Snow",
        "totalPoints": 25
      },
      {
        "id": "1002",
        "name": "Daenerys Targaryen",
        "totalPoints": 60,
      },
      {
        "id": "1003",
        "name": "Cersei Lannister",
        "totalPoints": 95,
      },
      {
        "id": "1004",
        "name": "Night King",
        "totalPoints": 0,
      },
      {
        "id": "1005",
        "name": "Sansa Stark",
        "totalPoints": 10
      },
      {
        "id": "1006",
        "name": "Arya Stark",
        "totalPoints": 0,
      },
      {
        "id": "1007",
        "name": "Bran Stark",
        "totalPoints": 0,
      },
      {
        "id": "1008",
        "name": "Jamie Lannister",
        "totalPoints": 100,
      },
      {
        "id": "1009",
        "name": "Tyrion Lannister",
        "totalPoints": 50,
      },
      {
        "id": "1010",
        "name": "Euron Grejoy",
        "totalPoints": 47,
      },
      {
        "id": "1011",
        "name": "Bronn",
        "totalPoints": 0,
      },
      {
        "id": "1012",
        "name": "Melisandre",
        "totalPoints": 10,
      },
      {
        "id": "1013",
        "name": "Theon Greyjoy",
        "totalPoints": 0,
      },
      {
        "id": "1014",
        "name": "Yara Greyjoy",
        "totalPoints": 0,
      },
      {
        "id": "1015",
        "name": "Brienne",
        "totalPoints": 0,
      },
      {
        "id": "1016",
        "name": "Clegane",
        "totalPoints": 0,
      },
      {
        "id": "1017",
        "name": "Davos",
        "totalPoints": 20,
      },
      {
        "id": "1018",
        "name": "Jorah Mormont",
        "totalPoints": 5,
      },
      {
        "id": "1019",
        "name": "Grey Worm",
        "totalPoints": 100,
      },
      {
        "id": "1020",
        "name": "Tormund",
        "totalPoints": 0,
      },
      {
        "id": "1022",
        "name": "Missandei",
        "totalPoints": 10,
      },
      {
        "id": "1023",
        "name": "Petyr Baelish",
        "totalPoints": 5,
      },
      {
        "id": "1024",
        "name": "Varys",
        "totalPoints": 5,
      },
      {
        "id": "1025",
        "name": "Samwell Tarly",
        "totalPoints": 12,
      },
      {
        "id": "1021",
        "name": "Lyanna Mormont",
        "totalPoints": 0,
      },
      {
        "id": "1026",
        "name": "Ellaria Sand",
        "totalPoints": 0,
      },
      {
        "id": "1027",
        "name": "Ollena Tyrell",
        "totalPoints": 67,
      },
      {
        "id": "1028",
        "name": "Qyburn",
        "totalPoints": 0
      }

    ]
  }

}
