import { Component } from '@angular/core';
import { Directive, ElementRef, Input, Inject, OnInit } from '@angular/core';
import { HostListener } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { SessionService } from "app/services/session.service";

@Component({
  moduleId: module.id,
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent {
  constructor(private router: Router, private sessionService: SessionService) {
  };
  ngOnInit() {
  }

  getStarted() {
    if (this.sessionService.isUserLoggedIn) {
      this.router.navigate(["/dashboard"]);
    } else {
      this.router.navigate(["/get-started"]);
    }
  }
}