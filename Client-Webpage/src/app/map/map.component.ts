import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ModalComponent} from "../modal/modal.component";
import {NgbModal, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import { MqttLocationService } from '../mqtt.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss'
})
export class MapComponent implements OnInit {
  modalRef: NgbModalRef | null = null;
  data: any;
  googleMapsKey = environment.GOOGLE_MAPS_KEY;
  zoom = 30;
  markers: any[] = []
  // Google Maps einbinden, Quelle: https://timdeschryver.dev/blog/google-maps-as-an-angular-component
  options: google.maps.MapOptions = {
    mapTypeId: 'hybrid',
    zoomControl: true,
    scrollwheel: true,
    disableDoubleClickZoom: true
  };

  @ViewChild('map') map: any | undefined;

  constructor(private modal: NgbModal, private mqttLocationService: MqttLocationService) {
  }

  ngOnInit() {
    //direktes Öffnen des Modals
    this.modalRef = this.modal.open(ModalComponent, {backdrop: false});
    // Funktion onModalClose() wird aufgerufen und Daten (Name + Gruppe) mitgegeben
    this.modalRef.result.then((data) => this.onModalClose(data))
    //Initiale Setzung des eigenen Standorts auf der Karte
    navigator.geolocation.getCurrentPosition((position) => {
      this.mqttLocationService.userMarker = {
        position: {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        },
        label: {
          color: 'white',
          text: 'Ich',
        },
        title: 'Me',
      };
      this.markers = this.getMarkers();
      this.setBounds();
    });
  }



  onModalClose(data: {group: "wi21a" | "feier" | "projektarbeit", name: string}) {
    //alle 20Sek wird der Standort neu gesetzt und an den Broker gepublished
    setInterval( () => {
      this.markers = this.getMarkers();
      this.setBounds()
      navigator.geolocation.getCurrentPosition((position) => {
        this.mqttLocationService.userName = data.name;
        this.mqttLocationService.userMarker = {
          position: {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          },
          label: {
            color: 'white',
            text: 'Ich',
          },
          title: 'Me',
        };
        this.data = {
          name: data.name,
          group: data.group,
          location: {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          },
          timestamp: new Date().getTime()
        }
        // neuer Standort + alle weiteren Daten werden an Broker gesendet
      this.mqttLocationService.publishLocation(`friendtracker/${data.group}`, this.data);
      })
    }, 20000)
  }

  // Karte wird so zentriert, dass alle Kartenmarker zu sehen sind
  // Hilfsquelle: https://stackoverflow.com/questions/3897744/automatically-adjust-zoom-to-accommodate-all-marker-in-a-google-map
  setBounds() {
    const bounds = new google.maps.LatLngBounds()
    this.getMarkers().forEach(pos => bounds.extend(new google.maps.LatLng(pos.position.lat, pos.position.lng)));
    this.map?.fitBounds(bounds);
  }

  getMarkers() {
    // erstellt einzelnes Array aus Gruppen-Arrays der ausgewählten Gruppen, iteriert darüber und erstellt Kartenmarker
    const entrys = Object.values(this.mqttLocationService.groups).flat().map((entry: any) => {
      return {
        position: {
          ...entry.location
        },
        label: {
          color: 'white',
          text: entry.name,
        },
        options: {
          icon: 'https://maps.google.com/mapfiles/kml/paddle/blu-blank.png',
        },
        title: entry.group,
      }
    });

    return [this.mqttLocationService.userMarker, ...entrys];
  }
}

