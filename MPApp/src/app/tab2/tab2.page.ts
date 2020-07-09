import { ChartDataSets } from 'chart.js';
import { Label, Color, BaseChartDirective } from 'ng2-charts';
import { HttpClient } from '@angular/common/http';

import * as firebase from 'firebase';

import { Component, ViewChild } from '@angular/core';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  yaxis = 'case';
  segment = 'Month';
  segment2 = 'Others';
  xaxis = 'month';
  xaxis2 = 'case';
  yaxis2 = 'case';


  @ViewChild("baseChart", { static: false })
  chart: BaseChartDirective;

  //date
  chartData: ChartDataSets[] = [{ data: [], label: '2014' }, { data: [], label: '2015' }, { data: [], label: '2016' }, { data: [], label: '2017' }, { data: [], label: '2018' }];
  chartLabels: Label[];

  //options
  chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    title: {
      display: true,
      text: this.yaxis + ' by: ' + this.xaxis
    },
    tooltips: {
      mode: 'index',
      intersect: false
    },
    hover: {
      mode: 'index',
      intersect: false
    },

    pan: {
      drag: true,
      enabled: true,
      mode: 'x',
      speed: 1
    },
    zoom: {

      enabled: true,
      mode: 'x'
    },
    scales: {
      yAxes: [{
        scaleLabel: {
          display: true,
          labelString: this.yaxis
        }
      }]
    },

  };

  chartColors: Color[] = [
    {
      borderColor: 'red',
      backgroundColor: 'red'
    }
  ];
  chartType = 'line';
  showLegend = false;







  constructor(private http: HttpClient) {

    this.getData();

  };

  IonViewDidLoad() {
    var acc = document.getElementsByClassName("accordion");
    var i: any;

    for (i = 0; i < acc.length; i++) {
      acc[i].addEventListener("click", function () {
        /* Toggle between adding and removing the "active" class,
        to highlight the button that controls the panel */
        this.classList.toggle("active");

        /* Toggle between hiding and showing the active panel */
        var panel = this.nextElementSibling;
        if (panel.style.display === "block") {
          panel.style.display = "none";
        } else {
          panel.style.display = "block";
        }
      });
    }
  }




  getData() {
    this.chartData = [{ data: [], label: '2014' }, { data: [], label: '2015' }, { data: [], label: '2016' }, { data: [], label: '2017' }, { data: [], label: '2018' }];
    this.chartType = 'line';

    if (this.chart !== undefined) {
      this.chart.chart.destroy();

      this.chart.options.scales = {
        yAxes: [{
          scaleLabel: {
            display: true,
            labelString: this.yaxis
          }
        }]
      };
      this.chart.options.title = {
        display: true,
        text: this.yaxis + ' by: month'
      };

      this.chart.options.tooltips = {
        mode: 'index',
        intersect: false
      };

      this.chart.colors = [

      ];

      this.chart.ngOnInit();
    }

    firebase.database().ref('Graph_scatter').child("2014").on('value', (snapshot) => {

      var testing = snapshot.val();

      console.log(testing);

      this.chartData[0].data = [];
      this.chartLabels = [];


      for (let entry of testing) {
        this.chartLabels.push(entry[this.xaxis]);
        this.chartData[0].data.push(entry[this.yaxis]);

      }
    });

    firebase.database().ref('Graph_scatter').child('2015').on('value', (snapshot) => {

      var testing = snapshot.val();

      console.log(testing);

      this.chartData[1].data = [];



      for (let entry of testing) {
        this.chartData[1].data.push(entry[this.yaxis]);

      }
    });

    firebase.database().ref('Graph_scatter').child('2016').on('value', (snapshot) => {

      var testing = snapshot.val();

      console.log(testing);

      this.chartData[2].data = [];


      for (let entry of testing) {
        this.chartData[2].data.push(entry[this.yaxis]);

      }
    });

    firebase.database().ref('Graph_scatter').child('2017').on('value', (snapshot) => {

      var testing = snapshot.val();

      console.log(testing);

      this.chartData[3].data = [];


      for (let entry of testing) {
        this.chartData[3].data.push(entry[this.yaxis]);

      }
    });

    firebase.database().ref('Graph_scatter').child('2018').on('value', (snapshot) => {

      var testing = snapshot.val();

      console.log(testing);

      this.chartData[4].data = [];


      for (let entry of testing) {
        this.chartData[4].data.push(entry[this.yaxis]);

      }
    });


  };




  getData2() {
    var tarray = [];

    this.chartData = [{ data: [], label: 'Year 2014-2018' }];
    this.chartLabels = [];
    this.chartType = 'line';

    if (this.chart !== undefined) {
      this.chart.chart.destroy();

      this.chart.options.scales = {
        yAxes: [{
          scaleLabel: {
            display: true,
            labelString: this.yaxis
          }
        }]
      };

      this.chart.options.tooltips = {
        mode: 'index',
        intersect: false
      };

      this.chart.options.title = {
        display: true,
        text: this.yaxis + ' by: year'
      };

      this.chart.colors = [

      ];

      this.chart.ngOnInit();
    }

    firebase.database().ref('Graph_scatter').child('2014').on('value', (snapshot) => {

      var info = snapshot.val();
      console.log(info);


      snapshot.forEach((data) => {
        console.log(data)
        tarray.push({
          case: data.val().case,
          year: data.val().year + data.val().month,
          rainfall: data.val().rainfall,
          temp: data.val().temp

        })

      });
      console.log(tarray);


    });

    firebase.database().ref('Graph_scatter').child('2015').on('value', (snapshot) => {

      var info = snapshot.val();
      console.log(info);


      snapshot.forEach((data) => {
        console.log(data)
        tarray.push({
          case: data.val().case,
          year: data.val().year + data.val().month,
          rainfall: data.val().rainfall,
          temp: data.val().temp

        })

      });
      console.log(tarray);


    });

    firebase.database().ref('Graph_scatter').child('2016').on('value', (snapshot) => {

      var info = snapshot.val();
      console.log(info);


      snapshot.forEach((data) => {
        console.log(data)
        tarray.push({
          case: data.val().case,
          year: data.val().year + data.val().month,
          rainfall: data.val().rainfall,
          temp: data.val().temp

        })

      });
      console.log(tarray);


    });

    firebase.database().ref('Graph_scatter').child('2017').on('value', (snapshot) => {

      var info = snapshot.val();
      console.log(info);


      snapshot.forEach((data) => {
        console.log(data)
        tarray.push({
          case: data.val().case,
          year: data.val().year + data.val().month,
          rainfall: data.val().rainfall,
          temp: data.val().temp

        })

      });
      console.log(tarray);


    });

    firebase.database().ref('Graph_scatter').child('2018').on('value', (snapshot) => {

      var info = snapshot.val();
      console.log(info);


      snapshot.forEach((data) => {
        console.log(data)
        tarray.push({
          case: data.val().case,
          year: data.val().year + data.val().month,
          rainfall: data.val().rainfall,
          temp: data.val().temp

        })

      });


      console.log(tarray);

      console.log(tarray);


    });

    for (let entry of tarray) {
      this.chartLabels.push(entry.year);
      this.chartData[0].data.push(entry[this.yaxis]);

    }






  }

  getData3() {
    var tarray = [];

    this.chartData = [{ data: [], label: 'North' }, { data: [], label: 'South' }, { data: [], label: 'East' }, { data: [], label: 'West' }, { data: [], label: 'Central' }];
    this.chartLabels = [];
    this.chartType = 'line';

    if (this.chart !== undefined) {
      this.chart.chart.destroy();

      this.chart.options.scales = {
        yAxes: [{
          scaleLabel: {
            display: true,
            labelString: "PSI"
          }
        }]
      };

      this.chart.options.tooltips = {
        mode: 'index',
        intersect: false
      };
      this.chart.options.title = {
        display: true,
        text: "Average PSI reading from 2014-2018"
      };

      this.chart.colors = [

      ];

      this.chart.ngOnInit();
    }

    firebase.database().ref('Graph_scatter').child('2014').on('value', (snapshot) => {

      var info = snapshot.val();
      console.log(info);


      snapshot.forEach((data) => {
        console.log(data)
        tarray.push({
          npsi: data.val().north,
          spsi: data.val().south,
          epsi: data.val().east,
          wpsi: data.val().west,
          cpsi: data.val().central,
          year: data.val().year + data.val().month

        })

      });
      console.log(tarray);


    });

    firebase.database().ref('Graph_scatter').child('2015').on('value', (snapshot) => {

      var info = snapshot.val();
      console.log(info);


      snapshot.forEach((data) => {
        console.log(data)
        tarray.push({
          npsi: data.val().north,
          spsi: data.val().south,
          epsi: data.val().east,
          wpsi: data.val().west,
          cpsi: data.val().central,
          year: data.val().year + data.val().month
        })

      });
      console.log(tarray);


    });

    firebase.database().ref('Graph_scatter').child('2016').on('value', (snapshot) => {

      var info = snapshot.val();
      console.log(info);


      snapshot.forEach((data) => {
        console.log(data)
        tarray.push({
          npsi: data.val().north,
          spsi: data.val().south,
          epsi: data.val().east,
          wpsi: data.val().west,
          cpsi: data.val().central,
          year: data.val().year + data.val().month
        })

      });
      console.log(tarray);


    });

    firebase.database().ref('Graph_scatter').child('2017').on('value', (snapshot) => {

      var info = snapshot.val();
      console.log(info);


      snapshot.forEach((data) => {
        console.log(data)
        tarray.push({
          npsi: data.val().north,
          spsi: data.val().south,
          epsi: data.val().east,
          wpsi: data.val().west,
          cpsi: data.val().central,
          year: data.val().year + data.val().month
        })

      });
      console.log(tarray);


    });

    firebase.database().ref('Graph_scatter').child('2018').on('value', (snapshot) => {

      var info = snapshot.val();
      console.log(info);


      snapshot.forEach((data) => {
        console.log(data)
        tarray.push({
          npsi: data.val().north,
          spsi: data.val().south,
          epsi: data.val().east,
          wpsi: data.val().west,
          cpsi: data.val().central,
          year: data.val().year + data.val().month
        })

      });


      console.log(tarray);

      console.log(tarray);


    });

    for (let entry of tarray) {
      this.chartLabels.push(entry.year);
      this.chartData[0].data.push(entry.npsi);
      this.chartData[1].data.push(entry.spsi);
      this.chartData[2].data.push(entry.epsi);
      this.chartData[3].data.push(entry.wpsi);
      this.chartData[4].data.push(entry.cpsi);

    }






  }

  getData4() {
    var tarray = [];

    this.chartData = [{ data: [], label: 'North' }, { data: [], label: 'Northeast' }, { data: [], label: 'East' }, { data: [], label: 'Southeast' }, { data: [], label: 'South' }, { data: [], label: 'Southwest' }, { data: [], label: 'West' }, { data: [], label: 'Northwest' }];
    this.chartLabels = [];
    this.chartType = 'line';

    if (this.chart !== undefined) {
      this.chart.chart.destroy();

      this.chart.options.scales = {
        yAxes: [{
          scaleLabel: {
            display: true,
            labelString: "Wind direction(%)"
          }
        }]
      };

      this.chart.options.tooltips = {
        mode: 'index',
        intersect: false
      };

      this.chart.options.title = {
        display: true,
        text: "Average wind direction(%) from 2014-2018"
      };

      this.chart.colors = [

      ];

      this.chart.ngOnInit();
    }

    firebase.database().ref('Graph_scatter').child('2014').on('value', (snapshot) => {

      var info = snapshot.val();
      console.log(info);


      snapshot.forEach((data) => {
        console.log(data)
        tarray.push({
          nwind: data.val().nwind,
          newind: data.val().newind,
          ewind: data.val().ewind,
          sewind: data.val().sewind,
          swind: data.val().swind,
          swwind: data.val().swwind,
          wwind: data.val().wwind,
          nwwind: data.val().nwwind,
          year: data.val().year + data.val().month

        })

      });
      console.log(tarray);


    });

    firebase.database().ref('Graph_scatter').child('2015').on('value', (snapshot) => {

      var info = snapshot.val();
      console.log(info);


      snapshot.forEach((data) => {
        console.log(data)
        tarray.push({
          nwind: data.val().nwind,
          newind: data.val().newind,
          ewind: data.val().ewind,
          sewind: data.val().sewind,
          swind: data.val().swind,
          swwind: data.val().swwind,
          wwind: data.val().wwind,
          nwwind: data.val().nwwind,
          year: data.val().year + data.val().month
        })

      });
      console.log(tarray);


    });

    firebase.database().ref('Graph_scatter').child('2016').on('value', (snapshot) => {

      var info = snapshot.val();
      console.log(info);


      snapshot.forEach((data) => {
        console.log(data)
        tarray.push({
          nwind: data.val().nwind,
          newind: data.val().newind,
          ewind: data.val().ewind,
          sewind: data.val().sewind,
          swind: data.val().swind,
          swwind: data.val().swwind,
          wwind: data.val().wwind,
          nwwind: data.val().nwwind,
          year: data.val().year + data.val().month
        })

      });
      console.log(tarray);


    });

    firebase.database().ref('Graph_scatter').child('2017').on('value', (snapshot) => {

      var info = snapshot.val();
      console.log(info);


      snapshot.forEach((data) => {
        console.log(data)
        tarray.push({
          nwind: data.val().nwind,
          newind: data.val().newind,
          ewind: data.val().ewind,
          sewind: data.val().sewind,
          swind: data.val().swind,
          swwind: data.val().swwind,
          wwind: data.val().wwind,
          nwwind: data.val().nwwind,
          year: data.val().year + data.val().month
        })

      });
      console.log(tarray);


    });

    firebase.database().ref('Graph_scatter').child('2018').on('value', (snapshot) => {

      var info = snapshot.val();
      console.log(info);


      snapshot.forEach((data) => {
        console.log(data)
        tarray.push({
          nwind: data.val().nwind,
          newind: data.val().newind,
          ewind: data.val().ewind,
          sewind: data.val().sewind,
          swind: data.val().swind,
          swwind: data.val().swwind,
          wwind: data.val().wwind,
          nwwind: data.val().nwwind,
          year: data.val().year + data.val().month
        })

      });


      console.log(tarray);

      console.log(tarray);


    });

    for (let entry of tarray) {
      this.chartLabels.push(entry.year);
      this.chartData[0].data.push(entry.nwind);
      this.chartData[1].data.push(entry.newind);
      this.chartData[2].data.push(entry.ewind);
      this.chartData[3].data.push(entry.sewind);
      this.chartData[4].data.push(entry.swind);
      this.chartData[5].data.push(entry.swwind);
      this.chartData[6].data.push(entry.wwind);
      this.chartData[7].data.push(entry.nwwind);

    }






  }


  getscatter() {
    this.chartData = [{ data: [], label: '2014', pointRadius: 10, backgroundColor: 'red' }, { data: [], label: '2015', pointRadius: 10, backgroundColor: 'blue' }, { data: [], label: '2016', pointRadius: 10, backgroundColor: 'green' }, { data: [], label: '2017', pointRadius: 10, backgroundColor: 'yellow' }, { data: [], label: '2018', pointRadius: 10, backgroundColor: 'purple' }];
    this.chartType = "scatter";
    this.chartLabels = [];

    if (this.chart !== undefined) {
      this.chart.chart.destroy();

      this.chart.options.scales = {
        yAxes: [{
          scaleLabel: {
            display: true,
            labelString: this.yaxis2
          }
        }]
      };
      this.chart.options.title = {
        display: true,
        text: this.yaxis2 + ' by ' + this.xaxis2
      };
      this.chart.options.tooltips = {};
      this.chart.colors = [{
        pointBorderColor: 'red',
        pointBackgroundColor: 'red',
        pointHoverBackgroundColor: 'red',
        pointHoverBorderColor: 'red'
      },
      {
        pointBackgroundColor: 'blue',
        pointHoverBackgroundColor: 'blue',
        pointHoverBorderColor: 'blue'
      },
      {
        pointBackgroundColor: 'green',
        pointHoverBackgroundColor: 'green',
        pointHoverBorderColor: 'green'
      },
      {
        pointBackgroundColor: 'yellow',
        pointHoverBackgroundColor: 'yellow',
        pointHoverBorderColor: 'yellow'
      },
      {
        pointBackgroundColor: 'purple',
        pointHoverBackgroundColor: 'purple',
        pointHoverBorderColor: 'purple'
      },
      ]

      this.chart.ngOnInit();
    }

    firebase.database().ref('Graph_scatter').child("2014").on('value', (snapshot) => {
      var tarray = [];

      var testing = snapshot.val();

      if (this.xaxis2 == 'case') {
        snapshot.forEach((data) => {

          if (this.yaxis2 == 'case') {
            tarray.push({
              x: data.val().case,
              y: data.val().case

            })
          }
          else if (this.yaxis2 == 'temp') {
            tarray.push({
              x: data.val().case,
              y: data.val().temp

            })
          }
          else if (this.yaxis2 == 'rainfall') {
            tarray.push({
              x: data.val().case,
              y: data.val().rainfall

            })
          }

        });

      }
      else if (this.xaxis2 == 'temp') {

        snapshot.forEach((data) => {

          if (this.yaxis2 == 'case') {
            tarray.push({
              x: data.val().temp,
              y: data.val().case

            })
          }
          else if (this.yaxis2 == 'temp') {
            tarray.push({
              x: data.val().temp,
              y: data.val().temp

            })
          }
          else if (this.yaxis2 == 'rainfall') {
            tarray.push({
              x: data.val().temp,
              y: data.val().rainfall

            })
          }


        });
      }
      else if (this.xaxis2 == 'rainfall') {

        snapshot.forEach((data) => {

          if (this.yaxis2 == 'case') {
            tarray.push({
              x: data.val().rainfall,
              y: data.val().case

            })
          }
          else if (this.yaxis2 == 'temp') {
            tarray.push({
              x: data.val().rainfall,
              y: data.val().temp

            })
          }
          else if (this.yaxis2 == 'rainfall') {
            tarray.push({
              x: data.val().rainfall,
              y: data.val().rainfall

            })
          }


        });
      }

      console.log(tarray);
      this.chartData[0].data = tarray;
    });

    firebase.database().ref('Graph_scatter').child("2015").on('value', (snapshot) => {
      var tarray = [];

      var testing = snapshot.val();



      if (this.xaxis2 == 'case') {
        snapshot.forEach((data) => {

          if (this.yaxis2 == 'case') {
            tarray.push({
              x: data.val().case,
              y: data.val().case

            })
          }
          else if (this.yaxis2 == 'temp') {
            tarray.push({
              x: data.val().case,
              y: data.val().temp

            })
          }
          else if (this.yaxis2 == 'rainfall') {
            tarray.push({
              x: data.val().case,
              y: data.val().rainfall

            })
          }

        });

      }
      else if (this.xaxis2 == 'temp') {

        snapshot.forEach((data) => {

          if (this.yaxis2 == 'case') {
            tarray.push({
              x: data.val().temp,
              y: data.val().case

            })
          }
          else if (this.yaxis2 == 'temp') {
            tarray.push({
              x: data.val().temp,
              y: data.val().temp

            })
          }
          else if (this.yaxis2 == 'rainfall') {
            tarray.push({
              x: data.val().temp,
              y: data.val().rainfall

            })
          }


        });
      }
      else if (this.xaxis2 == 'rainfall') {

        snapshot.forEach((data) => {

          if (this.yaxis2 == 'case') {
            tarray.push({
              x: data.val().rainfall,
              y: data.val().case

            })
          }
          else if (this.yaxis2 == 'temp') {
            tarray.push({
              x: data.val().rainfall,
              y: data.val().temp

            })
          }
          else if (this.yaxis2 == 'rainfall') {
            tarray.push({
              x: data.val().rainfall,
              y: data.val().rainfall

            })
          }


        });
      }
      console.log(tarray);
      this.chartData[1].data = tarray;
    });

    firebase.database().ref('Graph_scatter').child("2016").on('value', (snapshot) => {
      var tarray = [];

      var testing = snapshot.val();



      if (this.xaxis2 == 'case') {
        snapshot.forEach((data) => {

          if (this.yaxis2 == 'case') {
            tarray.push({
              x: data.val().case,
              y: data.val().case

            })
          }
          else if (this.yaxis2 == 'temp') {
            tarray.push({
              x: data.val().case,
              y: data.val().temp

            })
          }
          else if (this.yaxis2 == 'rainfall') {
            tarray.push({
              x: data.val().case,
              y: data.val().rainfall

            })
          }

        });

      }
      else if (this.xaxis2 == 'temp') {

        snapshot.forEach((data) => {

          if (this.yaxis2 == 'case') {
            tarray.push({
              x: data.val().temp,
              y: data.val().case

            })
          }
          else if (this.yaxis2 == 'temp') {
            tarray.push({
              x: data.val().temp,
              y: data.val().temp

            })
          }
          else if (this.yaxis2 == 'rainfall') {
            tarray.push({
              x: data.val().temp,
              y: data.val().rainfall

            })
          }


        });
      }
      else if (this.xaxis2 == 'rainfall') {

        snapshot.forEach((data) => {

          if (this.yaxis2 == 'case') {
            tarray.push({
              x: data.val().rainfall,
              y: data.val().case

            })
          }
          else if (this.yaxis2 == 'temp') {
            tarray.push({
              x: data.val().rainfall,
              y: data.val().temp

            })
          }
          else if (this.yaxis2 == 'rainfall') {
            tarray.push({
              x: data.val().rainfall,
              y: data.val().rainfall

            })
          }


        });
      }
      console.log(tarray);
      this.chartData[2].data = tarray;
    });

    firebase.database().ref('Graph_scatter').child("2017").on('value', (snapshot) => {
      var tarray = [];

      var testing = snapshot.val();





      if (this.xaxis2 == 'case') {
        snapshot.forEach((data) => {

          if (this.yaxis2 == 'case') {
            tarray.push({
              x: data.val().case,
              y: data.val().case

            })
          }
          else if (this.yaxis2 == 'temp') {
            tarray.push({
              x: data.val().case,
              y: data.val().temp

            })
          }
          else if (this.yaxis2 == 'rainfall') {
            tarray.push({
              x: data.val().case,
              y: data.val().rainfall

            })
          }

        });

      }
      else if (this.xaxis2 == 'temp') {

        snapshot.forEach((data) => {

          if (this.yaxis2 == 'case') {
            tarray.push({
              x: data.val().temp,
              y: data.val().case

            })
          }
          else if (this.yaxis2 == 'temp') {
            tarray.push({
              x: data.val().temp,
              y: data.val().temp

            })
          }
          else if (this.yaxis2 == 'rainfall') {
            tarray.push({
              x: data.val().temp,
              y: data.val().rainfall

            })
          }


        });
      }
      else if (this.xaxis2 == 'rainfall') {

        snapshot.forEach((data) => {

          if (this.yaxis2 == 'case') {
            tarray.push({
              x: data.val().rainfall,
              y: data.val().case

            })
          }
          else if (this.yaxis2 == 'temp') {
            tarray.push({
              x: data.val().rainfall,
              y: data.val().temp

            })
          }
          else if (this.yaxis2 == 'rainfall') {
            tarray.push({
              x: data.val().rainfall,
              y: data.val().rainfall

            })
          }


        });
      }
      console.log(tarray);
      this.chartData[3].data = tarray;
    });

    firebase.database().ref('Graph_scatter').child("2018").on('value', (snapshot) => {
      var tarray = [];

      var testing = snapshot.val();



      if (this.xaxis2 == 'case') {
        snapshot.forEach((data) => {

          if (this.yaxis2 == 'case') {
            tarray.push({
              x: data.val().case,
              y: data.val().case

            })
          }
          else if (this.yaxis2 == 'temp') {
            tarray.push({
              x: data.val().case,
              y: data.val().temp

            })
          }
          else if (this.yaxis2 == 'rainfall') {
            tarray.push({
              x: data.val().case,
              y: data.val().rainfall

            })
          }

        });

      }
      else if (this.xaxis2 == 'temp') {

        snapshot.forEach((data) => {

          if (this.yaxis2 == 'case') {
            tarray.push({
              x: data.val().temp,
              y: data.val().case

            })
          }
          else if (this.yaxis2 == 'temp') {
            tarray.push({
              x: data.val().temp,
              y: data.val().temp

            })
          }
          else if (this.yaxis2 == 'rainfall') {
            tarray.push({
              x: data.val().temp,
              y: data.val().rainfall

            })
          }


        });
      }
      else if (this.xaxis2 == 'rainfall') {

        snapshot.forEach((data) => {

          if (this.yaxis2 == 'case') {
            tarray.push({
              x: data.val().rainfall,
              y: data.val().case

            })
          }
          else if (this.yaxis2 == 'temp') {
            tarray.push({
              x: data.val().rainfall,
              y: data.val().temp

            })
          }
          else if (this.yaxis2 == 'rainfall') {
            tarray.push({
              x: data.val().rainfall,
              y: data.val().rainfall

            })
          }


        });
      }
      console.log(tarray);
      this.chartData[4].data = tarray;
    });





  }


  getscatter2() {
    this.chartData = [{ data: [], label: 'North', pointRadius: 10, backgroundColor: 'red' }, { data: [], label: 'South', pointRadius: 10, backgroundColor: 'blue' }, { data: [], label: 'East', pointRadius: 10, backgroundColor: 'green' }, { data: [], label: 'West', pointRadius: 10, backgroundColor: 'yellow' }];
    this.chartType = "scatter";
    this.chartLabels = [];

    if (this.chart !== undefined) {
      this.chart.chart.destroy();

      this.chart.options.scales = {
        yAxes: [{
          scaleLabel: {
            display: true,
            labelString: "PSI"
          }
        }]
      };
      this.chart.options.title = {
        display: true,
        text: "PSI by average wind direction(%) "
      };
      this.chart.options.tooltips = {};
      this.chart.colors = [{
        pointBorderColor: 'red',
        pointBackgroundColor: 'red',
        pointHoverBackgroundColor: 'red',
        pointHoverBorderColor: 'red'
      },
      {
        pointBackgroundColor: 'blue',
        pointHoverBackgroundColor: 'blue',
        pointHoverBorderColor: 'blue'
      },
      {
        pointBackgroundColor: 'green',
        pointHoverBackgroundColor: 'green',
        pointHoverBorderColor: 'green'
      },
      {
        pointBackgroundColor: 'yellow',
        pointHoverBackgroundColor: 'yellow',
        pointHoverBorderColor: 'yellow'
      }
      ]

      this.chart.ngOnInit();
    }
    var northarray = [];
    var southarray = [];
    var eastarray = [];
    var westarray = [];
    firebase.database().ref('Graph_scatter').child("2014").on('value', (snapshot) => {


      var testing = snapshot.val();




      snapshot.forEach((data) => {
        northarray.push({
          x: data.val().nwind,
          y: data.val().north

        });
        southarray.push({
          x: data.val().swind,
          y: data.val().south

        });
        eastarray.push({
          x: data.val().ewind,
          y: data.val().east

        });

        westarray.push({
          x: data.val().wwind,
          y: data.val().west

        });
      }

      );
    });





    firebase.database().ref('Graph_scatter').child("2015").on('value', (snapshot) => {

      var testing = snapshot.val();


      snapshot.forEach((data) => {
        northarray.push({
          x: data.val().nwind,
          y: data.val().north

        });
        southarray.push({
          x: data.val().swind,
          y: data.val().south

        });
        eastarray.push({
          x: data.val().ewind,
          y: data.val().east

        });

        westarray.push({
          x: data.val().wwind,
          y: data.val().west

        });
      }


      );
    });



    firebase.database().ref('Graph_scatter').child("2016").on('value', (snapshot) => {


      var testing = snapshot.val();


      snapshot.forEach((data) => {
        northarray.push({
          x: data.val().nwind,
          y: data.val().north

        });
        southarray.push({
          x: data.val().swind,
          y: data.val().south

        });
        eastarray.push({
          x: data.val().ewind,
          y: data.val().east

        });

        westarray.push({
          x: data.val().wwind,
          y: data.val().west

        });
      }


      );
    });


    firebase.database().ref('Graph_scatter').child("2017").on('value', (snapshot) => {


      var testing = snapshot.val();


      snapshot.forEach((data) => {
        northarray.push({
          x: data.val().nwind,
          y: data.val().north

        });
        southarray.push({
          x: data.val().swind,
          y: data.val().south

        });
        eastarray.push({
          x: data.val().ewind,
          y: data.val().east

        });

        westarray.push({
          x: data.val().wwind,
          y: data.val().west

        });
      }


      );
    });



    firebase.database().ref('Graph_scatter').child("2018").on('value', (snapshot) => {


      var testing = snapshot.val();


      snapshot.forEach((data) => {
        northarray.push({
          x: data.val().nwind,
          y: data.val().north

        });
        southarray.push({
          x: data.val().swind,
          y: data.val().south

        });
        eastarray.push({
          x: data.val().ewind,
          y: data.val().east

        });

        westarray.push({
          x: data.val().wwind,
          y: data.val().west

        });
      }


      );
    });
    this.chartData[0].data = northarray;
    this.chartData[1].data = southarray;
    this.chartData[2].data = eastarray;
    this.chartData[3].data = westarray;
  }





}