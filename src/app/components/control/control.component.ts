import { Component, OnDestroy, OnInit } from '@angular/core';
import mqtt from 'mqtt';
@Component({
  standalone: true,
  selector: 'app-mqtt-control',
  template: `
    <div class="p-4 space-y-4">
      <h1 class="text-2xl font-bold">Control de Movimiento</h1>
      <button (click)="sendMessage('controles/adelante')" class="btn">Adelante</button>
      <button (click)="sendMessage('controles/atras')" class="btn">Atrás</button>
      <button (click)="sendMessage('controles/girar/izq')" class="btn">Girar Izquierda</button>
      <button (click)="sendMessage('controles/girar/der')" class="btn">Girar Derecha</button>
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
  `]
})
export class ControlComponent implements OnInit, OnDestroy {
  private client: mqtt.MqttClient | undefined;
  private brokerUrl = 'ws://3.80.77.21:15675/ws'; // Cambiar por IP pública
  private username = 'manuel';
  private password = 'upchiapas23';

  ngOnInit() {
    this.connectToBroker();
  }

  private connectToBroker() {
    this.client = mqtt.connect(this.brokerUrl, {
      username: this.username,
      password: this.password,
      reconnectPeriod: 3000, // Reintento cada 1s en caso de desconexión
    });

    this.client.on('connect', () => {
      console.log('✅ Conectado a RabbitMQ MQTT');
    });

    this.client.on('error', (err) => {
      console.error('❌ Error de conexión MQTT:', err);
    });

    this.client.on('close', () => {
      console.warn('⚠️ Conexión MQTT cerrada');
    });
  }

  sendMessage(topic: string) {
    if (this.client && this.client.connected) {
      this.client.publish(topic, '1', {}, (err) => {
        if (err) {
          console.error('❌ Error al publicar:', err);
        } else {
          console.log(`📨 Mensaje enviado a ${topic}`);
        }
      });
    } else {
      console.warn('⚠️ Cliente MQTT no conectado');
    }
  }

  ngOnDestroy() {
    if (this.client) {
      this.client.end();
      console.log('👋 Cliente MQTT desconectado');
    }
  }
}
