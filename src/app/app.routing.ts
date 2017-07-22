import { ModuleWithProviders } from '@angular/core';
import { PreloadAllModules, Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { GetStartedComponent } from './components/get-started/get-started.component';
import { AllianceComponent } from './components/alliance/alliance.component';
import { GamePlayComponent } from './components/game-play/game-play.component';
import { LeaderboardComponent } from './components/leaderboard/leaderboard.component';
import { AuthService } from "app/services/auth.service";
import { DashboardComponent } from "app/components/dashboard/dashboard.component";
import { SelectTeamComponent } from "app/components/select-team/select-team.component";
import { PointsSystemComponent } from "app/components/points-system/points-system.component";
import { AdminHomeComponent } from "app/admin/admin-home/admin-home.component";

const appRoutes: Routes = [
  {
    path: '',
    component: HomeComponent,
    data: {
      title: 'GOT Fantasy League | Home',
      metaKeywords: '',
      metaDesc: ''
    },
  },
  {
    path: 'get-started',
    component: GetStartedComponent,
    data: {
      title: 'GOT Fantasy League | Get Started',
      metaKeywords: '',
      metaDesc: ''
    },
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthService],
    data: {
      title: 'GOT Fantasy League | Dashboard',
      metaKeywords: '',
      metaDesc: ''
    },
  },
  {
    path: 'select-team',
    component: SelectTeamComponent,
    canActivate: [AuthService],
    data: {
      title: 'GOT Fantasy League | Dashboard',
      metaKeywords: '',
      metaDesc: ''
    },
  },
  {
    path: 'alliance',
    component: AllianceComponent,
    canActivate: [AuthService],
    data: {
      title: 'GOT Fantasy League | Join Alliance',
      metaKeywords: '',
      metaDesc: ''
    },
  },
  {
    path: 'game-play',
    component: GamePlayComponent,
    data: {
      title: 'GOT Fantasy League | GamePlay',
      metaKeywords: '',
      metaDesc: ''
    },

  },
  {
    path: 'points-system',
    component: PointsSystemComponent,
    data: {
      title: 'GOT Fantasy League | Points System',
      metaKeywords: '',
      metaDesc: ''
    },

  },
  {
    path: 'leaderboard',
    component: LeaderboardComponent,
    data: {
      title: 'GOT Fantasy League | Leaderboard',
      metaKeywords: '',
      metaDesc: ''
    }
  },
  {
    path: 'admin',
    component: AdminHomeComponent,
    data: {
      title: 'GOT Fantasy League | Admin',
      metaKeywords: '',
      metaDesc: ''
    }
  }
];
// {}

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules, useHash: true });
