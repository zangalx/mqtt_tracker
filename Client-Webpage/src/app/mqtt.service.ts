import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { IMqttMessage, MqttService } from 'ngx-mqtt';

@Injectable({
  providedIn: 'root'
})
export class MqttLocationService {
  private locationSubject = new Subject<google.maps.LatLngLiteral>();
  private isConnected = false;

  userName: string = ''
  userMarker: any = {};
  groups = {
    wi21a: [],
    feier: [],
    projektarbeit: []
  } as any

  constructor(private _mqttService: MqttService) {
    // prüfen, ob MqttBroker läuft
    this._mqttService.onConnect.subscribe(() => {
      this.isConnected = true;
    });
    this._mqttService.onClose.subscribe(() => {
      this.isConnected = false;
    });

  }

  // publish-Funktion, um Broker Daten zu schicken
  publishLocation(channel: string, location: google.maps.LatLngLiteral) {
    if (this.isConnected) {
      this._mqttService.publish(channel, JSON.stringify(location), {qos: 1}).subscribe({
        error: (error) => console.error(`Failed to publish message: ${error.message}`)
      });
    }
  }

  // subscribe-Funktion, um vom Broker Daten zu empfangen
  subscribeToLocation(channel: string): Observable<IMqttMessage> {
    return this._mqttService.observe(channel);
  }
}
