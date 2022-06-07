import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
const routes: Routes = [
  {
    path: '',
    redirectTo: 'welcome',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'forgot-password',
    loadChildren: () => import('./pages/forgot-password/forgot-password.module').then(m => m.ForgotPasswordPageModule)
  },
  {
    path: 'welcome',
    loadChildren: () => import('./pages/welcome/welcome.module').then(m => m.WelcomePageModule)
  },
  {
    path: 'personalinfos',
    loadChildren: () => import('./pages/personalinfos/personalinfos.module').then(m => m.PersonalinfosPageModule)
  },
  {
    path: 'simulate-op',
    loadChildren: () => import('./pages/simulate-op/simulate-op.module').then(m => m.SimulateOpPageModule)
  },
  {
    path: 'simulate-res',
    loadChildren: () => import('./pages/simulate-res/simulate-res.module').then(m => m.SimulateResPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'verify-otp',
    loadChildren: () => import('./pages/verify-otp/verify-otp.module').then(m => m.VerifyOTPPageModule)
  },
  {
    path: 'send-otp',
    loadChildren: () => import('./pages/send-otp/send-otp.module').then(m => m.SendOTPPageModule)
  },
  {
    path: 'setpassword',
    loadChildren: () => import('./pages/setpassword/setpassword.module').then(m => m.SetpasswordPageModule)
  },

  {
    path: 'ocrhome',
    loadChildren: () => import('./pages/ocrhome/ocrhome.module').then(m => m.OcrhomePageModule)
  },
  {
    path: 'ocrop',
    loadChildren: () => import('./pages/ocrop/ocrop.module').then(m => m.OcropPageModule)
  },
  {
    path: 'credit',
    loadChildren: () => import('./pages/credit/credit.module').then(m => m.CreditPageModule)
  },
  {
    path: 'forgot-password',
    loadChildren: () => import('./pages/forgot-password/forgot-password.module').then(m => m.ForgotPasswordPageModule)
  },
  {
    path: 'welcome',
    loadChildren: () => import('./pages/welcome/welcome.module').then(m => m.WelcomePageModule)
  },
  {
    path: 'personalinfos',
    loadChildren: () => import('./pages/personalinfos/personalinfos.module').then(m => m.PersonalinfosPageModule)
  },
  {
    path: 'simulate-op',
    loadChildren: () => import('./pages/simulate-op/simulate-op.module').then(m => m.SimulateOpPageModule)
  },
  {
    path: 'simulate-res',
    loadChildren: () => import('./pages/simulate-res/simulate-res.module').then(m => m.SimulateResPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'verify-otp',
    loadChildren: () => import('./pages/verify-otp/verify-otp.module').then(m => m.VerifyOTPPageModule)
  },
  {
    path: 'send-otp',
    loadChildren: () => import('./pages/send-otp/send-otp.module').then(m => m.SendOTPPageModule)
  },
  {
    path: 'setpassword',
    loadChildren: () => import('./pages/setpassword/setpassword.module').then(m => m.SetpasswordPageModule)
  },

  {
    path: 'ocrhome',
    loadChildren: () => import('./pages/ocrhome/ocrhome.module').then(m => m.OcrhomePageModule)
  },
  {
    path: 'ocrop',
    loadChildren: () => import('./pages/ocrop/ocrop.module').then(m => m.OcropPageModule)
  },
  {
    path: 'decision',
    loadChildren: () => import('./pages/decision/decision.module').then(m => m.DecisionPageModule)
  },
  {
    path: 'decision/ok',
    loadChildren: () => import('./pages/decision/decision.module').then(m => m.DecisionPageModule)
  },
  {
    path: 'decision/okUp',
    loadChildren: () => import('./pages/decision/decision.module').then(m => m.DecisionPageModule)
  },
  {
    path: 'decision/ops',
    loadChildren: () => import('./pages/decision/decision.module').then(m => m.DecisionPageModule)
  },
  {
    path: 'decision/opsUp',
    loadChildren: () => import('./pages/decision/decision.module').then(m => m.DecisionPageModule)
  },
  {
    path: 'simulate-op/new',
    loadChildren: () => import('./pages/simulate-op/simulate-op.module').then(m => m.SimulateOpPageModule)
  },
  {
    path: 'simulate-res/new',
    loadChildren: () => import('./pages/simulate-res/simulate-res.module').then(m => m.SimulateResPageModule)
  },
  {
    path: 'simulate-op/update',
    loadChildren: () => import('./pages/simulate-op/simulate-op.module').then(m => m.SimulateOpPageModule)
  },
  {
    path: 'simulate-res/update',
    loadChildren: () => import('./pages/simulate-res/simulate-res.module').then(m => m.SimulateResPageModule)
  },
  {
    path: 'decision/annuler',
    loadChildren: () => import('./pages/decision/decision.module').then(m => m.DecisionPageModule)
  },
  {
    path: 'decision/error',
    loadChildren: () => import('./pages/decision/decision.module').then(m => m.DecisionPageModule)
  },
  {
    path: 'decision/okUppass',
    loadChildren: () => import('./pages/decision/decision.module').then(m => m.DecisionPageModule)
  },
  {
    path: 'decision/opsUppass',
    loadChildren: () => import('./pages/decision/decision.module').then(m => m.DecisionPageModule)
  },
  {
    path: 'contactus',
    loadChildren: () => import('./pages/contactus/contactus.module').then(m => m.ContactusPageModule)
  },
  {
    path: 'decision/opscontact',
    loadChildren: () => import('./pages/decision/decision.module').then(m => m.DecisionPageModule)
  },
  {
    path: 'decision/okcontact',
    loadChildren: () => import('./pages/decision/decision.module').then(m => m.DecisionPageModule)
  },

  //okUppass   opsUppass
  // {
  //   path: 'simulate-res/update/{id}',
  //   loadChildren: () => import('./pages/simulate-res/simulate-res.module').then( m => m.SimulateResPageModule)
  // }









];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }