import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomePage } from './home.page';

// const routes: Routes = [
//   {
//     path: '',
//     component: HomePage
//   }
// ];

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children: [
      {
        path: 'profile',
        loadChildren: () => import('../profile/profile.module').then( m => m.ProfilePageModule),
      },
      {
        path: 'credit',
        loadChildren: () => import('../credit/credit.module').then( m => m.CreditPageModule),
        // children: [
        //   {
        //     path: '',
        //     loadChildren: '../credit/credit.module#SchedulesPageModule',
        //   },
        //   {
        //     path: ':id',
        //     loadChildren:
        //       '../credit/schedule.module#SchedulePageModule'
        //   }
        // ]
      },
      {
        path: 'contactus',
        loadChildren: () => import('../contactus/contactus.module').then( m => m.ContactusPageModule)
      },
      {
        path: '',
        redirectTo: '/home/profile',
        pathMatch: 'full'
      }
    ]
  }, {
    path: '',
    redirectTo: '/home/profile',
    pathMatch: 'full'
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule {}
