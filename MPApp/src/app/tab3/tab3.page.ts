import { Component , ViewChild  } from '@angular/core';
import * as firebase from 'firebase';

import { ChartDataSets } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import {Chart} from 'chart.js';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
 @ViewChild('barChart') barChart;

  bars: any;
  colorArray: any;

  public datas: any;


  year_data = '';
  year_dataa = '';

  public years : any ;
  public yearss : any;

  //bar graph
  chartData: ChartDataSets[] = [{ data: [], label: 'Average Temperature' }, { data: [], label: 'Dengue Cases' }, {data:[], label : 'Rainfall'} ];
  chartLabels: Label[];

  chartOptions = {
    responsive: true,
    title: {
      display: true,
      text: 'Avg Temp / Dengue / Rainfall'
    },
    pan: {
      enabled: false,
      mode: 'xy'
    },
    zoom: {
      enabled: false,
      mode: 'xy'
    }
  };
  chartColors: Color[] = [
    {
      borderColor: '#000000',
      backgroundColor: '#ff00ff', 
    }
  ];
  chartType = 'bar';
  showLegend = false;





  constructor() {}
  
  getData(){

    //this.years = event.srcElement.value
    this.years = this.year_data;

    firebase.database().ref('Temperature').child(this.years).on('value', (snapshot) => {
      var temp = snapshot.val();

      this.chartData[0].data = [];
      this.chartLabels = [];

    for (let entry of temp){
      this.chartLabels.push(entry.month);
      this.chartData[0].data.push(entry.meantemp);
    }
    });


    firebase.database().ref('Dengue').child(this.years).on('value', (snapshot2) => {
      var deng = snapshot2.val();

      this.chartData[1].data = [];

    for (let entry of deng){
      this.chartData[1].data.push(entry.case);
      console.log(this.chartData[1]);
    }
    });

    firebase.database().ref('Rainfall').child(this.years).on('value', (snapshot3) => {
      var rain = snapshot3.val();

      this.chartData[2].data = [];

    for (let entry of rain){
      this.chartData[2].data.push(entry.totalrainfall);
    }
    });
  }





  createBarChart() {

    var totaldengue = [];

    this.yearss = this.year_dataa;

    firebase.database().ref('Dengue').child(this.yearss).on('value', (snapshot3) => {
      var dengg = snapshot3.val();

      console.log(dengg);

    for (let entry of dengg){
      totaldengue.push(entry.case) ;
    }





    this.bars = new Chart(this.barChart.nativeElement, {
      type: 'pie',
      data: {
        labels: ['Jan','Feb','March','April','May','June','July','August','September','October','November','December'],
        datasets: [{
          label: 'Viewers in millions',
          data: totaldengue,
          backgroundColor: ['rgb(38, 194, 129)','rgb(136, 0, 0)','rgb(136, 83, 0)','rgb(243, 55, 69)','rgb(172, 79, 84)','rgb(98, 104, 213)','rgb(123, 141, 252)','rgb(149, 60, 167)','rgb(181, 191, 200)','rgb(181, 293, 122)','rgb(124, 215, 202)','rgb(64, 57, 235)'], // array should have same number of elements as number of dataset
          borderColor: 'rgb(38, 194, 129)',// array should have same number of elements as number of dataset
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
      
    });
    
  });
    
  }

}