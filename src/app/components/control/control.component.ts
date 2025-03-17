import { Component } from '@angular/core';
import { ControlService } from '../../services/control.service';

@Component({
  standalone: true,
  selector: 'app-control',
  template: `
    <div class="p-4 space-y-4">
      <h1 class="text-2xl font-bold">Control de Movimiento</h1>
      <button (click)="sendMessage('forward')" class="btn">Adelante</button>
      <button (click)="sendMessage('backward')" class="btn">Atrás</button>
      <button (click)="sendMessage('left')" class="btn">Girar Izquierda</button>
      <button (click)="sendMessage('right')" class="btn">Girar Derecha</button>
      <button (click)="sendMessage('stop')" class="btn stop-btn">Detener</button>
    </div>
  `,
  styles: [`
    .btn {
      padding: 10px 20px;
      margin: 5px;
      background-color: #4f46e5;
      color: white;
      border-radius: 8px;
      cursor: pointer;
      transition: background-color 0.3s;
    }
    .btn:hover {
      background-color: #3730a3;
    }
    .stop-btn {
      background-color: red;
    }
    .stop-btn:hover {
      background-color: darkred;
    }
  `]
})
export class ControlComponent {
  constructor(private controlService: ControlService) {}

  sendMessage(command: string) {
    this.controlService.sendCommand(command).subscribe({
      next: (response) => console.log('✅ Comando enviado:', response),
      error: (error) => console.error('❌ Error al enviar comando:', error)
    });
  }
}
