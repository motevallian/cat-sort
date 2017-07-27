import {Component, Input, OnInit} from '@angular/core';
import {CatsList} from '../models/person.model';

@Component({
  selector: 'app-gender-cat-list',
  templateUrl: './gender-cat-list.component.html',
  styleUrls: ['./gender-cat-list.component.scss']
})
export class GenderCatListComponent implements OnInit {

  @Input()
  public gender: string;

  @Input()
  public catsList: string[];

  constructor() { }

  ngOnInit() {
  }

}
