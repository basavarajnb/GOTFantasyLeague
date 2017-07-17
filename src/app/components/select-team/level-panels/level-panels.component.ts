import { Component, OnInit, Input } from '@angular/core';
import { Level } from "app/common/character";
import { CommonDialogComponent } from "app/controls/dialogs/common-dialog/common-dialog.component";
import { MdDialog } from "@angular/material";

@Component({
  selector: 'app-level-panels',
  templateUrl: './level-panels.component.html',
  styleUrls: ['./level-panels.component.css']
})
export class LevelPanelsComponent implements OnInit {
  @Input() level: Level;

  disableButtons: boolean = false;

  constructor(public dialog: MdDialog) { }

  ngOnInit() {
    this.disableOrEnableButtons();
  }

  addPlayer(player) {
    if (this.level.playersSelected.find(x => x.id === player.id)) {
      let dialogRef = this.dialog.open(CommonDialogComponent, {
        data: "Player is already added",
      });
    }
    else {
      if (this.level.playersSelected.length < this.level.maxPlayers) {
        this.level.playersSelected.push(player);
      }
      else {
        let dialogRef = this.dialog.open(CommonDialogComponent, {
          data: "Can not add more than " + this.level.maxPlayers + " Players, in Level :" + this.level.level,
        });
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
