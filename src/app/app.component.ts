import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ControlComponent } from './components/control/control.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ControlComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'MQTT-Front';
}
