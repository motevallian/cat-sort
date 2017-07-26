import {TestBed, inject} from '@angular/core/testing';
import * as _ from 'lodash';

import {CatsExtractorService} from './cats-extractor.service';
import {CatsList, Person} from '../models/person.model';

describe('CatsExtractorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CatsExtractorService]
    });
  });

  it('should be created', inject([CatsExtractorService], (service) => {
    expect(service).toBeTruthy();
  }));

  describe('extractCats()', () => {
    describe('given 1 Female has a cat and 1 Male has no cats', () => {
      let people: Person[];
      let expectedCatList: CatsList;
      let result: CatsList;

      beforeEach(inject([CatsExtractorService], (service) => {
        people = [
          {name: 'Bob', gender: 'Male', age: 23, pets: [{name: 'Fido', type: 'Dog'}]},
          {name: 'Jennifer', gender: 'Female', age: 18, pets: [{name: 'Garfield', type: 'Cat'}]}
        ];
        expectedCatList = { Male: [], Female: ['Garfield'] };

        result = service.extractCats(people);
      }));

      it('should return the cat name under Female section of the result', () => {
        expect(result.Female).toEqual(expectedCatList.Female);
      });

      it('should ignore the Male\'s pet', () => {
        expect(result.Male).toEqual([]);
      });
    });

    describe('given one Female and one Male each has a cat', () => {
      it('should return the cat name under Female section of the result', inject([CatsExtractorService], (service) => {

        const people: Person[] = [
          {name: 'Fred', gender: 'Male', age: 40, pets: [{name: 'Tom', type: 'Cat'}]},
          {name: 'Jennifer', gender: 'Female', age: 18, pets: [{name: 'Garfield', type: 'Cat'}]}
        ];
        const expectedCatList: CatsList = { Male: ['Tom'], Female: ['Garfield'] };

        const result = service.extractCats(people);
        expect(result).toEqual(expectedCatList);
      }));
    });

    it('should ignore a person with no pets, i.e. pets == null', inject([CatsExtractorService], (service) => {

      const people: Person[] = [
        {name: 'Fred', gender: 'Male', age: 40, pets: null},
        {name: 'Jennifer', gender: 'Female', age: 18, pets: [{name: 'Garfield', type: 'Cat'}]}
      ];
      const expectedCatList: CatsList = { Male: [], Female: ['Garfield'] };

      const result = service.extractCats(people);
      expect(result).toEqual(expectedCatList);
    }));

    describe('given a Male has multiple cats', () => {
      it('should return all cat names', inject([CatsExtractorService], (service) => {
        const people: Person[] = [
          {name: 'Fred', gender: 'Male', age: 40, pets: [{name: 'Tom', type: 'Cat'}, {name: 'Max', type: 'Cat'}]},
          {name: 'Jennifer', gender: 'Female', age: 18, pets: [{name: 'Garfield', type: 'Cat'}]}
        ];
        const expectedCatList: CatsList = { Male: ['Tom', 'Max'], Female: ['Garfield'] };

        const result = service.extractCats(people);
        expect(result.Male).toEqual(expectedCatList.Male);
      }));
    });


  });
});
