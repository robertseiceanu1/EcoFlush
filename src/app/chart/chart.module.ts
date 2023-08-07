import { NgModule } from "@angular/core";
import { FusionChartsModule } from "angular-fusioncharts";
import * as FusionCharts from "fusioncharts";
import * as Charts from "fusioncharts/fusioncharts.charts";
import * as FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";
import { ChartComponent } from "./chart.component";

FusionChartsModule.fcRoot(FusionCharts, Charts, FusionTheme);

@NgModule({
  declarations: [ChartComponent],
  imports: [
    FusionChartsModule
  ],
  exports: [ChartComponent]
})
export class ChartModule {}