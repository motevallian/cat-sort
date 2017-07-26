import {Injectable} from '@angular/core';
import * as _ from 'lodash';

import {CatsList, Person, Pet} from '../models/person.model';

@Injectable()
export class CatsExtractorService {

  constructor() {
  }

  extractCats(people: Person[]): CatsList {
    return _(people).flatMap((person: Person) => {
      return _(person.pets)           // For each pet of the current person:
        .filter((pet: Pet) => {       // filter out any pet that is not a 'Cat'.
          return pet.type === 'Cat';
        }).map(pet => {               // map it to this object: { gender: [person's gender], catName: name of the cat}
          return {
            gender: person.gender,
            catName: pet.name
          };
        })
        .value();   // Now we have an array [{ gender, catName}] for each person, Let us flatten them into a single array.
    }).reduce((catsList, catObj) => {
        // The name of the cat is appended to the end of the array matching its owner's gender.
        catsList[catObj.gender].push(catObj.catName);
        return catsList;
    },
      // catsList is the final list which iterates over the flattens array and collects each cat name into its correct section.
      {Male: [], Female: []} as CatsList);
  }
}
