import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-collapse',
  templateUrl: './collapse.component.html',
  styleUrls: ['./collapse.component.css']
})
export class CollapseComponent implements OnInit {
  @Input("collapseVisible") public collapseVisible = false;
  @Input("collaseBodyVisible") public collaseBodyVisible = true;

  constructor() { }

  ngOnInit() {
  }

  toggleCollapseBody() {
    this.collaseBodyVisible = !this.collaseBodyVisible
  }
}

