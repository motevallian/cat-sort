import {Component, Input, OnInit} from '@angular/core';
import {CatsList} from '../models/person.model';

@Component({
  selector: 'app-gender-cat-list',
  templateUrl: './gender-cat-list.component.html',
  styleUrls: ['./gender-cat-list.component.css']
})
export class GenderCatListComponent implements OnInit {

  @Input()
  gender: string;

  @Input()
  catsList: string[];

  constructor() { }

  ngOnInit() {
  }

}
