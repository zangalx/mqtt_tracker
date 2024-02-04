import {MqttLocationService} from '../mqtt.service';
import {Component} from "@angular/core";
import {Subscription} from "rxjs";


type Groups = {
  wi21a: boolean,
  feier: boolean,
  projektarbeit: boolean
}

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent {

  subscriptions: Subscription = new Subscription();
  groups: Groups = {
    wi21a: false,
    feier: false,
    projektarbeit: false
  }

  constructor(private mqttLocationService: MqttLocationService) {
  }
  //Wird getriggert, wenn sich etwas an der Gruppenselektion ändert
  onChange() {
    // Unsubscriben aller offenen Subscriptions
    this.subscriptions.unsubscribe();
    // Überschreiben und erstellen eines Subscription-Handlers
    this.subscriptions = new Subscription();
    // Filtert nach den Nutzern der ausgewählten Gruppen
    const selectedGroups = Object.keys(this.groups).filter((groupKey) => this.groups[(groupKey as keyof Groups)]);

    // Iteration über Nutzer, die angezeigt werden sollen
    selectedGroups.forEach((groupName: any) => {
      // Subscriben auf das Observable (asynchrone Infos vom Broker) und Speichern in Subscription
      const subscription = this.mqttLocationService.subscribeToLocation(`friendtracker/${groupName}`).subscribe(message => {
        const location = JSON.parse(message.payload.toString());
        // kommen vom Broker 1min lang keine Aktualisierungen zu einem Nutzer wird er aus der Liste genommen (damit sein Marker nicht mehr auf der Karte angezeigt wird)
        this.mqttLocationService.groups[groupName] = this.mqttLocationService.groups[groupName].filter((entry: any) => new Date().getTime() - entry.timestamp < (1000 * 60));
        if (this.mqttLocationService.groups[groupName].find((entry: any) => entry.name === location.name)) {
          const index = this.mqttLocationService.groups[groupName].findIndex((entry: any) => entry.name === location.name);
          this.mqttLocationService.groups[groupName].splice(index, 1)
        }
        // Benutzer selbst wird nicht hinhzugefügt, nur andere Nutzer
        if (location.name !== this.mqttLocationService.userName) {
          this.mqttLocationService.groups[groupName].push(location);
        }
      })
      // Hinzufügen zu Subscriptions-Handler
      this.subscriptions.add(subscription);
    })
  }
}
