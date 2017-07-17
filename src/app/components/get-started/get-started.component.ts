import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { FacebookService, LoginResponse, LoginOptions } from 'ngx-facebook';
import { AuthService } from '../../services/auth.service';
import { SessionService } from "app/services/session.service";

@Component({
  selector: 'app-get-started',
  templateUrl: './get-started.component.html',
  styleUrls: ['./get-started.component.scss']
})
export class GetStartedComponent implements OnInit {

  constructor(private fb: FacebookService,
    private router: Router,
    private sessionService: SessionService) { }

  ngOnInit() {
    this.sessionService.$loggedIn().subscribe((user) => {
      if (user) {
        this.router.navigate(["/dashboard"]);
      }
    });
  }

  loginWithFacebook(): void {
    this.sessionService.fbLogIn();
  }
}
