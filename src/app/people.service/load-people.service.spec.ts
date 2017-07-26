import { TestBed, inject } from '@angular/core/testing';

import { LoadPeopleService } from './load-people.service';

describe('LoadPeopleService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoadPeopleService]
    });
  });

  it('should be created', inject([LoadPeopleService], (service: LoadPeopleService) => {
    expect(service).toBeTruthy();
  }));

  describe('retrievePeople()', () => {
    it('should retrieve the correct response from the server', inject([LoadPeopleService], (service: LoadPeopleService) => {
      const expectedPeople = [{
        name: 'Bob',
        gender: 'Male',
        age: 23,
        pets: [
          {
            name: 'Garfield',
            type: 'Cat'
          },
          {
            name: 'Fido',
            type: 'Dog'
          }
        ]
      }];
      const resultPeople = service.retrievePeople();
      expect(resultPeople).toEqual(expectedPeople);
    }));
  });

});
