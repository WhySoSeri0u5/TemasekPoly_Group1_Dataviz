import { Component } from '@angular/core';
import * as firebase from 'firebase';
import * as MarkerClusterer from 'node-js-marker-clusterer';

declare var google;
var map;
var heatmap;
var heatmap2;

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  markers: any;

  toggle = 0;

  constructor() {

  }

  /* <Load Google Maps while it is about to enter and become the active page.> */
  ionViewWillEnter() {
    this.loadMap();
  }

  /* <Functions to set each Visualisation with a Toggle number> */
  showClusterVisual() {
    this.toggle = 0
  }

  showHeatVisual() {
    this.toggle = 1
  }

  showCircleVisual() {
    this.toggle = 2
  }

  /* <Create a new Google Map with specific settings> */
  loadMap() {
    map = new google.maps.Map(document.getElementById('map'), {
      center: { lat: 1.3464837, lng: 103.8429012 },
      zoom: 10.1,
      panControl: false,
      gestureHandling: 'greedy',
      disableDoubleClickZoom: true,
    });

    /* <Based on the Toggle number, run specified Functions> */
    if (this.toggle == 0) {

      this.addCluster(map)

    }
    else if (this.toggle == 1) {

      this.displayHeatmap()
      this.displayHeatmap2()

    }

    else if (this.toggle == 2) {

      this.inputCircles(map)

    }
  }

  /* <First Visualisation - Marker Clustering> */
  addCluster(map) {
    var markerCluster;
    var clusterArray: any = [];

    /* <Reference the "AreaClusters" dataset in Firebase> */
    var dbRef = firebase.database().ref('AreaClusters');
    dbRef.on('value', function (snapshot) {
      snapshot.forEach(function (child) {
        var childs = child.val();
        clusterArray = clusterArray.concat(childs)
      });
      let markers = clusterArray.map((clusters) => {
        /* <Create markers for every latitude & longitude> */
        return new google.maps.Marker({
          position: { lat: clusters.latitude, lng: clusters.longitude }
        });
      });

      /* <Create new Marker Cluster set on the map with the markers.
          Cluster display/design is based on the imagePath.
          - Based on the number of markers in an area, the colour of the cluster will change accordingly> */
      markerCluster = new MarkerClusterer(map, markers, { imagePath: 'assets/icon/m' });
    })
  }

  /* <Second Visualisation - First HeatMap> */

  displayHeatmap() {
    var heatmapData = [];

    /* <Reference the "DengueData" dataset in Firebase> */
    var dbRef = firebase.database().ref('DengueData');
    dbRef.on('value', function (snapshot) {
      snapshot.forEach(function (child) {
        var childs = child.val();
        /* <data will hold every latitude - Y, longitude - X provided in DengueData> */
        let data = new google.maps.LatLng(childs['Y'], childs['X']);
        /* <Put them in heatmapData> */
        heatmapData.push(data);
      });

      /* <Create HeatMap based on the data provided and set on the map> */
      heatmap = new google.maps.visualization.HeatmapLayer({
        data: heatmapData,
        map: map
      });
    })
  }

  /* <Change the colour of the First HeatMap> */
  changeGradient() {
    var gradient = [
      'rgba(0, 255, 255, 0)',
      'rgba(0, 255, 255, 1)',
      'rgba(0, 191, 255, 1)',
      'rgba(0, 127, 255, 1)',
      'rgba(0, 63, 255, 1)',
      'rgba(0, 0, 255, 1)',
      'rgba(0, 0, 223, 1)',
      'rgba(0, 0, 191, 1)',
      'rgba(0, 0, 159, 1)',
      'rgba(0, 0, 127, 1)',
      'rgba(63, 0, 91, 1)',
      'rgba(127, 0, 63, 1)',
      'rgba(191, 0, 31, 1)',
      'rgba(255, 0, 0, 1)'
    ]
    heatmap.set('gradient', heatmap.get('gradient') ? null : gradient);
  }

  /* <Change the size of the First HeatMap - 15> */
  changeRadius() {
    heatmap.set('radius', heatmap.get('radius') ? null : 15);
  }

  /* <Hide the First HeatMap - 0.1> */
  changeOpacity() {
    heatmap.set('opacity', heatmap.get('opacity') ? null : 0.1);
  }

  /* <Third Visualisation - Circular Display> */
  inputCircles(map) {
    /* <Reference the "DengueData" dataset in Firebase> */
    var dbRef = firebase.database().ref('DengueData');
    dbRef.on('value', function (snapshot) {
      snapshot.forEach(function (child) {
        var childs = child.val();
        /* <Create a new circle based on the amount of dengue cases.
            Varying case sizes will have different displays> */
        if (childs.CASE_SIZE <= 15) {
          var cityCircle = new google.maps.Circle({
            clickable: true,
            strokeColor: '#5DADE2',
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: '#5DADE2',
            fillOpacity: 0.35,
            map: map,
            center: { lat: childs['Y'], lng: childs['X'] },
            radius: Math.sqrt(childs.CASE_SIZE) * 100
          });
        }
        else if (childs.CASE_SIZE > 15 && childs.CASE_SIZE <= 35) {
          var cityCircle = new google.maps.Circle({
            clickable: true,
            strokeColor: '#F4D03F',
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: '#F4D03F',
            fillOpacity: 0.35,
            map: map,
            center: { lat: childs['Y'], lng: childs['X'] },
            radius: Math.sqrt(childs.CASE_SIZE) * 100
          });
        }
        else {
          var cityCircle = new google.maps.Circle({
            clickable: true,
            strokeColor: '#F1948A',
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: '#F1948A',
            fillOpacity: 0.35,
            map: map,
            center: { lat: childs['Y'], lng: childs['X'] },
            radius: Math.sqrt(childs.CASE_SIZE) * 100
          });
        }

        /* <Content for the InfoWindow> */
        const contentString = '<div id="content">' +
          '<img src="assets/icon/cityIcon.png" width="50">' +
          '<h5 id="firstHeading" class="firstHeading">' + childs.LOCALITY + '</h5>' +
          '<p>Latitude: ' + childs['Y'] + '</p>' +
          '<p>Longitude: ' + childs['X'] + '</p>' +
          '<p>Dengue Cases: ' + childs.CASE_SIZE + '</p>'
        '</div>';

        /* <Create new InfoWindows based on the contentString> */
        const infoWindow = new google.maps.InfoWindow({
          content: contentString
        })

        /* <Allow the Circles to have InfoWindows> */
        google.maps.event.addListener(cityCircle, 'click', function (ev) {
          infoWindow.setPosition(cityCircle.getCenter());
          infoWindow.open(map);
        });
      })
    })
  }

  /* <Second HeatMap> */
  displayHeatmap2() {
    var heatmapData2 = [];
    /* <Reference the "BreedingLocale" dataset in Firebase> */
    var dbRef = firebase.database().ref('BreedingLocale');
    dbRef.on('value', function (snapshot) {
      snapshot.forEach(function (child) {
        var childs = child.val();
        /* <data2 will hold every latitude, longitude provided in BreedingLocale> */
        let data2 = new google.maps.LatLng(childs.latitude, childs.longitude);
        /* <Put them in heatmapData2> */
        heatmapData2.push(data2);
      });

      /* <Create HeatMap based on the data provided and set on the map> */
      heatmap2 = new google.maps.visualization.HeatmapLayer({
        data: heatmapData2,
        map: map
      });
    })
  }

  /* <Change the colour of the Second HeatMap> */
  changeGradient2() {
    var gradient2 = [
      'rgba(0, 255, 255, 0)',
      'rgba(0, 255, 255, 1)',
      'rgba(0, 191, 255, 1)',
      'rgba(0, 127, 255, 1)',
      'rgba(0, 63, 255, 1)',
      'rgba(0, 0, 255, 1)',
      'rgba(0, 0, 223, 1)',
      'rgba(0, 0, 191, 1)',
      'rgba(0, 0, 159, 1)',
      'rgba(0, 0, 127, 1)',
      'rgba(63, 0, 91, 1)',
      'rgba(127, 0, 63, 1)',
      'rgba(191, 0, 31, 1)',
      'rgba(255, 0, 0, 1)'
    ]
    heatmap2.set('gradient', heatmap2.get('gradient') ? null : gradient2);
  }

  /* <Change the size of the Second HeatMap - 15> */
  changeRadius2() {
    heatmap2.set('radius', heatmap2.get('radius') ? null : 15);
  }

  /* <Hide the Second HeatMap - 0.1> */
  changeOpacity2() {
    heatmap2.set('opacity', heatmap2.get('opacity') ? null : 0.1);
  }
}