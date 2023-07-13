import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TankMonitorPage } from './tank_monitor.page';

const routes: Routes = [
  {
    path: '',
    component: TankMonitorPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TankMonitorPageRoutingModule {}
