import {Injectable} from '@angular/core';
import * as _ from 'lodash';

import {CatsList, Person, Pet} from '../models/person.model';

@Injectable()
export class CatsExtractorService {

  constructor() {
  }

  extractCats(people: Person[]): CatsList {
    const catObjs = _(people)
      .flatMap(this.extractPersonCats.bind(this))
      .value(); // Now we have an array [{ gender, catName}] for each person, Let us flatten them into a single array.
    const catsList = this.collectcatObjsArray(catObjs);
    return this.sortCatNames(catsList);
  }

  /**
   * Sorting cat names in each section.
   */
  private sortCatNames(catsList: CatsList): CatsList {
   return {
     Male: _.sortBy(catsList.Male),
     Female: _.sortBy(catsList.Female),
   };
  }

  /**
   * For each person, this method returns the cats as an array of CatObj.
   */
  private extractPersonCats(person: Person): CatObj[] {
    return _(person.pets)           // For each pet of the current person:
      .filter((pet: Pet) => {       // filter out any pet that is not a 'Cat'.
        return pet.type === 'Cat';
      }).map(pet => {               // map it to this object: { gender: [person's gender], catName: name of the cat}
        return {
          gender: person.gender,
          catName: pet.name
        };
      })
      .value();

  }

  /**
   * Given the array [{ gender, catName}] of cats, it converts it to the CatsList object.
   */
  private collectcatObjsArray(catObjs: CatObj[]): CatsList {
    return _.reduce(catObjs, (catsList, catObj) => {
        // The name of the cat is appended to the end of the array matching its owner's gender.
        catsList[catObj.gender].push(catObj.catName);
        return catsList;
      },
      // catsList is the final list which iterates over the flattens array and collects each cat name into its correct section.
      {Male: [], Female: []} as CatsList);
  }
}

interface CatObj {
  gender: string;
  catName: string;
}
