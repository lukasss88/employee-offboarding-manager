import { Component, signal, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-search-bar',
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatIconModule],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.sass',
})
export class SearchBarComponent {
  term = signal('');
  termChange = output<string>();
}
