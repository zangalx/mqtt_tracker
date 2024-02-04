import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {Component} from "@angular/core";

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})

export class ModalComponent {

  name: string = "";
  group: "wi21a" | "feier" | "projektarbeit" | null = null;
  constructor(private activeModal: NgbActiveModal) {
  }

  // Gruppe und Name des Nutzers werden beim Schließen des Modals (an MapComponent) mitgereicht
  close() {
    this.activeModal.close({group: this.group, name: this.name});
  }

}
