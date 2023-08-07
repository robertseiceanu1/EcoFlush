// chart.component.ts
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "chart-container",
  templateUrl: "chart.component.html",
  styleUrls: ["chart.component.scss"]
})
export class ChartComponent implements OnInit {
  dataSource: object;
  constructor() {
    const initialVolume = 30;
    const availableVolume = `Available Volume : ${initialVolume} ltrs`;
    this.dataSource = {
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
      "value": initialVolume,

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
            "fontSize": "11",
            "fillcolor": "#333333",
            "text": availableVolume,
            "x": "$chartCenterX-35",
            "y": "$chartEndY-70"
          }]
        }]
      }
    };
  }
  ngOnInit() {}
}