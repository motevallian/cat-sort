import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import 'rxjs/add/operator/map';

import {environment} from '../../environments/environment';
import {Observable} from 'rxjs/Observable';
import {Person} from '../models/person.model';

@Injectable()
export class LoadPeopleService {

  constructor(private http: Http) {
  }

  retrievePeople(): Observable<Person[]> {
    return this.http.get(environment.endpointUrl)
      .map((res: Response) => res.json() );
  }
}
