import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';


declare var mapboxgl: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
  standalone: false
})
export class MapPage implements OnInit, AfterViewInit {

  lat: number = 0;
  lng: number = 0;

  constructor(
    private router: ActivatedRoute
  ) { }

  ngOnInit() {
    let geo = this.router.snapshot.paramMap.get('geo');
    console.log('Received geo:', geo);

    geo = geo?.substring(4) || ''; // Remove 'geo:' prefix
    const geoArray = geo.split(','); // Latitude and longitude are separated by a comma
    //this.lat = parseFloat(geoArray[0]);
    //this.lng = parseFloat(geoArray[1]);
    this.lat = parseFloat('4.6049377');
    this.lng = parseFloat('-74.0670127');

    console.log('Parsed coordinates:', this.lat, this.lng);

  }

  ngAfterViewInit(): void {
    // sets the access token, associating the map with your Mapbox account and its permissions
    mapboxgl.accessToken = environment.mapbox;

    // creates the map, setting the container to the id of the div you added in step 2, and setting the initial center and zoom level of the map
    const map = new mapboxgl.Map({
      // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
      style: 'mapbox://styles/mapbox/light-v11',
      center: [this.lng, this.lat],
      zoom: 15.5,
      pitch: 45,
      bearing: -17.6,
      container: 'map',
      antialias: true
    });

    map.on('style.load', () => {
      map.resize();

      new mapboxgl.Marker({
        draggable: false
      })
        .setLngLat([this.lng, this.lat])
        .addTo(map);

      // Insert the layer beneath any symbol layer.
      const layers = map.getStyle().layers;
      const labelLayerId = layers.find(
        (layer: any) => layer.type === 'symbol' && layer.layout['text-field']
      ).id;

      // The 'building' layer in the Mapbox Streets
      // vector tileset contains building height data
      // from OpenStreetMap.
      map.addLayer(
        {
          'id': 'add-3d-buildings',
          'source': 'composite',
          'source-layer': 'building',
          'filter': ['==', 'extrude', 'true'],
          'type': 'fill-extrusion',
          'minzoom': 15,
          'paint': {
            'fill-extrusion-color': '#aaa',

            // Use an 'interpolate' expression to
            // add a smooth transition effect to
            // the buildings as the user zooms in.
            'fill-extrusion-height': [
              'interpolate',
              ['linear'],
              ['zoom'],
              15,
              0,
              15.05,
              ['get', 'height']
            ],
            'fill-extrusion-base': [
              'interpolate',
              ['linear'],
              ['zoom'],
              15,
              0,
              15.05,
              ['get', 'min_height']
            ],
            'fill-extrusion-opacity': 0.6
          }
        },
        labelLayerId
      );
    });
  }

}
