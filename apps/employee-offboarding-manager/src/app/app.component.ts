import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GlobalSpinnerComponent } from '@shared/ui';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, GlobalSpinnerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.sass',
})
export class AppComponent {}
