import {TestBed, inject} from '@angular/core/testing';

import {CatsExtractorService} from './cats-extractor.service';
import {CatsList, Person} from '../models/person.model';

describe('CatsExtractorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CatsExtractorService]
    });
  });

  it('should be created', inject([CatsExtractorService], (service: CatsExtractorService) => {
    expect(service).toBeTruthy();
  }));

  describe('extractCats()', () => {
    describe('given only a Female has a cat', () => {
      it('should return the cat name under Female section of the result',
        inject([CatsExtractorService], (service: CatsExtractorService) => {

          const people: Person[] = [{
              name: 'Bob',
              gender: 'Male',
              age: 23,
              pets: [ {name: 'Fido', type: 'Dog'} ]
            },
            {
              name: 'Jennifer',
              gender: 'Female',
              age: 18,
              pets: [ {name: 'Garfield', type: 'Cat'} ]
            }];
          const expectedCatList: CatsList = {
            Male: [],
            Female: ['Garfield']
          };

          const result = service.extractCats(people);
          expect(result).toEqual(expectedCatList);
        }));
    });

    describe('given one Female and one Male each has a cat', () => {
      it('should return the cat name under Female section of the result',
        inject([CatsExtractorService], (service: CatsExtractorService) => {

          const people: Person[] = [{
            name: 'Fred',
            gender: 'Male',
            age: 40,
            pets: [ {name: 'Tom', type: 'Cat'} ]
          },
            {
              name: 'Jennifer',
              gender: 'Female',
              age: 18,
              pets: [ {name: 'Garfield', type: 'Cat'} ]
            }];
          const expectedCatList: CatsList = {
            Male: ['Tom'],
            Female: ['Garfield']
          };

          const result = service.extractCats(people);
          expect(result).toEqual(expectedCatList);
        }));
    });
  });
});
