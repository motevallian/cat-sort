import { Component } from '@angular/core';
import {CatsList} from './models/person.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public catsList: CatsList = {Male: ['Garfield', 'Jim', 'Max', 'Tom'], Female: ['Garfield', 'Simba', 'Tabby']};

  constructor() {

  }
}
