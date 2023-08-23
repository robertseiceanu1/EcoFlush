// chart.component.ts
import { Component, OnInit } from "@angular/core";
import * as FusionCharts from "fusioncharts";
import { FirebaseService } from "../database/firestore-service";

@Component({
  selector: "chart-container",
  templateUrl: "chart.component.html",
  styleUrls: ["chart.component.scss"]
})
export class ChartComponent implements OnInit {
  constructor() {
  }
  
  async ngOnInit() {
    const firebaseService = new FirebaseService();
    const lastVolume = await firebaseService.getMostRecentVolume();
    const dataSource = this.getDatasource(lastVolume);
    const tankChart = new FusionCharts({
      type: 'cylinder',
      dataFormat: 'json',
      id: 'tankMeter',
      renderAt: 'chart-container',
      width: '350',
      height: '600',
      dataSource: dataSource
    });
    tankChart.render();
  }

  setVolume(newVolume: number) {
    const newData = this.getDatasource(newVolume);
    //this.tankChart.setChartData(newData, "json");
  }

  getDatasource(tankLevel:number) {
    const availableVolume = `Available Volume : ${tankLevel} ltrs`;
    const newData= {
      "chart": {
        "theme": "fusion",
        "caption": "Water level of bathtub tank",
        "lowerLimit": "0",
        "upperLimit": "40",
        "lowerLimitDisplay": "Empty",
        "upperLimitDisplay": "Full",
        "numberSuffix": " ltrs",
        "showValue": "0",
        "chartBottomMargin": "60",
        "cylFillColor": "#00bbff"
      },
      "value": tankLevel,
      "annotations": {
        "origw": "400",
        "origh": "190",
        "autoscale": "1",
        "groups": [{
          "id": "range",
          "items": [{
            "id": "rangeBg",
            "type": "rectangle",
            "x": "$canvasCenterX-125",
            "y": "$chartEndY-50",
            "tox": "$canvasCenterX +145",
            "toy": "$chartEndY-95",
            "fillcolor": "#6caa03"
          }, {
            "id": "rangeText",
            "type": "Text",
            "fontSize": "20",
            "fillcolor": "#333333",
            "text": availableVolume,
            "x": "$chartCenterX-35",
            "y": "$chartEndY-70"
          }]
        }]
      }
    };
    return newData;
  }
}