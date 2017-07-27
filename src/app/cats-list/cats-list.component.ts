import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/do';

import {CatsList, Person} from '../models/person.model';
import {LoadPeopleService} from '../people.service/load-people.service';
import {CatsExtractorService} from '../cats.service/cats-extractor.service';

@Component({
  selector: 'app-cats-list',
  templateUrl: './cats-list.component.html',
  styleUrls: ['./cats-list.component.css']
})
export class CatsListComponent implements OnInit {
  // Creating two streams of cat names, 1 for Female owners and one for Male owners.
  public maleCatsList: Observable<string[]>;
  public femaleCatsList: Observable<string[]>;

  constructor(private loadPeople: LoadPeopleService,
              private catExtractor: CatsExtractorService) { }

  ngOnInit(): void {
    const people$ = this.loadPeople.retrievePeople()
      .map((people: Person[]) => {
        return this.catExtractor.extractCats(people);
      }).share(); // This step is very important to ensure Male and Female subscriptions in below do not cause TWO API calls.

    this.maleCatsList = people$.map((catsList: CatsList) => catsList.Male);
    this.femaleCatsList = people$.map((catsList: CatsList) => catsList.Female);
  }


}
