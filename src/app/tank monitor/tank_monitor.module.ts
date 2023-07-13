import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TankMonitorPage } from './tank_monitor.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { TankMonitorPageRoutingModule } from './tank_monitor-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    TankMonitorPageRoutingModule
  ],
  declarations: [TankMonitorPage]
})
export class TankMonitorPageModule {}
