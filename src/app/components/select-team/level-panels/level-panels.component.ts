import { Component, OnInit, Input } from '@angular/core';
import { Level } from "app/common/character";

@Component({
  selector: 'app-level-panels',
  templateUrl: './level-panels.component.html',
  styleUrls: ['./level-panels.component.css']
})
export class LevelPanelsComponent implements OnInit {
  @Input() level: Level;

  disableButtons: boolean = false;

  constructor() { }

  ngOnInit() {
    this.disableOrEnableButtons();
  }

  addPlayer(player) {
    if (this.level.playersSelected.find(x => x.id === player.id)) {
      alert("Player is already added");
    }
    else {
      if (this.level.playersSelected.length < this.level.maxPlayers) {
        this.level.playersSelected.push(player);
      }
      else {
        alert("Can not add more than " + this.level.maxPlayers + " Players, in Level :" + this.level.level);
      }
    }
    this.disableOrEnableButtons();
  }

  removePlayerFromLevel(player) {
    this.level.playersSelected = this.level.playersSelected.filter(item => item.id !== player.id);
    this.disableOrEnableButtons();
  }

  disableOrEnableButtons() {
    if (this.level.playersSelected.length < this.level.maxPlayers) {
      this.disableButtons = false;
    }
    else {
      this.disableButtons = true;
    }

  }

}
