import { Component, EventEmitter, HostListener, Output, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';


@Component({
  standalone: true,
  selector: 'app-modal',
  imports: [CommonModule],
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ModalComponent {
  @Output() closed = new EventEmitter<void>();
  close() { this.closed.emit(); }
  @HostListener('document:keydown.escape')
  onEsc() {
    this.close();
  }
}
