import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-maps',
  templateUrl: './maps.page.html',
  styleUrls: ['./maps.page.scss'],
})
export class MapsPage implements AfterViewInit {
  @ViewChild('mapContainer', { static: false }) mapContainer!: ElementRef;

  map: google.maps.Map | undefined;

  center = { lat: -33.360756, lng: -70.677797 }; // Center coordinates
  
  constructor() {}

  ngAfterViewInit() {
    this.initMap();
  }

  initMap() {
    this.map = new google.maps.Map(this.mapContainer.nativeElement, {
      center: this.center,
      zoom: 14,
    });

    this.addMarker(this.center);
  }

  addMarker(position: { lat: number; lng: number }) {
    // Ensure the map is available
    if (!this.map) {
      console.error("Map instance is not available.");
      return;
    }

    const marker = new google.maps.Marker({
      position: position,
      map: this.map,
      title: 'My Marker',
    });
    console.log('Standard marker added at:', position);
  }
}
