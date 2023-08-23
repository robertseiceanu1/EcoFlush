import { Component, NgZone } from '@angular/core';

import * as FusionCharts from "fusioncharts";
import { FirebaseService } from '../database/firestore-service';

@Component({
  selector: 'results-profile',
  templateUrl: 'results.page.html',
  styleUrls: ['results.page.scss'],
})

export class ResultsPage {
  
  typeOfChip(daysBack: number)
  {
    if(daysBack==1) return 'Last day'
    if(daysBack==30) return 'Last month'
    if(daysBack==365) return 'Last year'
    else return 'Lifetime'
  }
  renderChartForPeriod(daysBack:number) {
    const firebaseService = new FirebaseService();
    var dataFetch = firebaseService.getData(daysBack);
    
    dataFetch.then(data => {
      const dataStore = new FusionCharts.DataStore();
      const dataSource:any = {
        chart: {},
        caption: {
          text: "Available water volume"
        },
        subcaption: {
          text: `${this.typeOfChip(daysBack)}`
        },
        yaxis: [
          {
            plot: {
              value: "volume",
              type: "line",
              connectnulldata: true,
            },
            format: {
              suffix: "L"
            },
            title: "Available volume"
          }
        ],
        xAxis: {
          "plot": "timestamp"
      }
      }

      const schema = [{
        name: "timestamp",
        type: "date"
      },
      {
        name: "volume",
        type: "number"
      }];
      
      const fusionDataStore = new FusionCharts.DataStore();
      const fusionTable = fusionDataStore.createDataTable(data, schema, {
        enableIndex: true,
        indexBy: "timestamp"
      });
      console.log(fusionTable);
      dataSource.data = fusionTable;

      const chart = FusionCharts('resultChart');
      if(chart !== undefined) {
        chart.dispose();
      }
      new FusionCharts({
        id: "resultChart",
        type: "timeseries",
        renderAt: "result-chart-container",
        width: "100%",
        height: "500",
        dataSource: dataSource,
      }).render();
    }); 
  }

  addNewDocuments() {
    const service = new FirebaseService();
    service.addNewDocuments();
  }

  ngOnInit() {
    
    this.renderChartForPeriod(1);
  }
}
