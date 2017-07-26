import { TestBed, inject } from '@angular/core/testing';
import {HttpModule, XHRBackend, ResponseOptions, Response} from '@angular/http';
import {MockBackend, MockConnection} from '@angular/http/testing';

import { LoadPeopleService } from './load-people.service';
import {Person} from '../models/person.model';

describe('LoadPeopleService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [
        LoadPeopleService,
        { provide: XHRBackend, useClass: MockBackend }
      ]
    });
  });

  it('should be created', inject([LoadPeopleService], (service: LoadPeopleService) => {
    expect(service).toBeTruthy();
  }));

  describe('retrievePeople()', () => {
    beforeEach(() => {

    });

    it('should retrieve the correct response from the server',
      inject([LoadPeopleService, XHRBackend],
        (service, mockBackend) => {
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

      mockBackend.connections.subscribe((conn: MockConnection) => {
        conn.mockRespond(new Response(new ResponseOptions({
          body: JSON.stringify(expectedPeople)
        })));
      });

      service.retrievePeople().subscribe((resultPeople: Person[]) => {
        expect(resultPeople).toEqual(expectedPeople);
      });

    }));
  });

});
