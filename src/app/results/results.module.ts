import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ResultsPage } from './results.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { ResultsPageRoutingModule } from './results-routing.module';
import {MatChipsModule} from '@angular/material/chips';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    ResultsPageRoutingModule,
    MatChipsModule

  ],
  declarations: [ResultsPage]
})
export class ResultsPageModule {

}
