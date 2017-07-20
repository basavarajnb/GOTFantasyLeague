import { Component, OnInit, OnDestroy } from '@angular/core';
import { AngularFireService } from "app/services/angularfire.service";
import { UserService } from "app/services/user.service";

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit, OnDestroy {

  private usersList: Array<any>;
  private charactersList;
  private subscriptions;
  constructor(private angularFireService: AngularFireService,
    private userService: UserService) { }

  ngOnInit() {
    this.subscriptions = this.angularFireService.getUserList().subscribe((users) => {
      this.usersList = users;
      console.log("Users List -> ", this.usersList);
      this.calculateAndReturnRanks(this.usersList);
      this.usersList.sort(function (a, b) { return b.points - a.points })
      console.log("Users List after calc -> ", this.usersList);

      let i = 0;
      this.usersList.forEach(user => {
        user.rank = ++i;
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

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }




  updateRankAndPoints(users) {
    this.angularFireService.updateRankAndPoints(users);
  }



  // Rank and Points
  calculateAndReturnRanks(userList) {
    this.charactersList = this.calculateCharacterPoints().sort(function (a, b) { return b.totalPoints - a.totalPoints });
    // return this.angularFireService.getUserList().map((userList) => {
    userList.forEach(user => {
      if (user && user.currentSelectedPlayers) {
        let userPoints = 0;
        user.currentSelectedPlayers.forEach(character => {
          let char = this.charactersList.find(x => x.id === character.id);
          if (char && char.totalPoints) {
            userPoints = userPoints + char.totalPoints;
          }
        });
        user.points = user.points + userPoints;
      }
    });
    return userList;
    // });
  }

  calculateCharacterPoints() {
    let point_system = this.point_system;
    let currentEpisode = "episode1";
    point_system[currentEpisode].forEach(character => {
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
    return point_system[currentEpisode];
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

}
