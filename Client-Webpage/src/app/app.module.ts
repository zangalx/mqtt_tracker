import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormComponent} from "./form/form.component";
import {IMqttServiceOptions, MqttModule, MqttService} from "ngx-mqtt";
import {MapComponent} from "./map/map.component";
import {ModalComponent} from "./modal/modal.component";
import {MqttLocationService} from "./mqtt.service";
import {NgbModalModule} from "@ng-bootstrap/ng-bootstrap";
import {GoogleMapsModule} from "@angular/google-maps";
import {AppComponent} from "./app.component";
import {RouterModule} from "@angular/router";
import {BrowserModule} from "@angular/platform-browser";
import {appRoutes} from "./app.routes";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgIconsModule} from "@ng-icons/core";
import { environment } from '../environments/environment';

export const MQTT_SERVICE_OPTIONS: IMqttServiceOptions = {
  hostname: environment.MQTT_BROKER_NAME,
  port: environment.MQTT_BROKER_WEB_SOCKET_PORT,
  path: '/ws',
  protocol: 'wss',
  username: environment.MQTT_BROKER_USER,
  password: environment.MQTT_BROKER_PASSWORD,
  reconnectPeriod: 100000,
}

@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    MapComponent,
    ModalComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    GoogleMapsModule,
    NgbModalModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MqttModule.forRoot(MQTT_SERVICE_OPTIONS),
  ],
  providers: [MqttService, MqttLocationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
