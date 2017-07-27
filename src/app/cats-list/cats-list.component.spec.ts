import {async, ComponentFixture, fakeAsync, inject, TestBed, tick} from '@angular/core/testing';

import {CatsListComponent} from './cats-list.component';
import {GenderCatListComponent} from '../gender-cat-list/gender-cat-list.component';
import {LoadPeopleService} from '../people.service/load-people.service';
import {CatsExtractorService} from '../cats.service/cats-extractor.service';
import {Subject} from 'rxjs/Subject';
import {By} from '@angular/platform-browser';

fdescribe('CatsListComponent', () => {
  let component: CatsListComponent;
  let fixture: ComponentFixture<CatsListComponent>;

  let loadPeople;
  let people;
  let people$;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        CatsListComponent,
        GenderCatListComponent
      ],
      providers: [
        {
          provide: LoadPeopleService,
          useValue: jasmine.createSpyObj('loadPeople', ['retrievePeople'])
        },
        CatsExtractorService
      ]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CatsListComponent);
    component = fixture.componentInstance;

    loadPeople = fixture.debugElement.injector.get(LoadPeopleService);

    people = [
      {name: 'Fred', gender: 'Male', age: 40, pets: [{name: 'Tom', type: 'Cat'}]},
      {name: 'Jennifer', gender: 'Female', age: 18, pets: [{name: 'Garfield', type: 'Cat'}]}
    ];
    people$ = new Subject();

    loadPeople.retrievePeople.and.returnValue(people$);

    fixture.detectChanges();

  });

  it('should be created', fakeAsync(() => {
    component.maleCatsList.subscribe((maleCatsList) => {
      expect(maleCatsList).toEqual(['Tom']);
    }, () => {
      fail('maleCatsList is empty');
    });

    component.femaleCatsList.subscribe((femaleCatsList) => {
      expect(femaleCatsList).toEqual(['Garfield']);
    }, () => {
      fail('maleCatsList is empty');
    });

    people$.next(people);

    tick();

  }));

  it('should render two li elements each containing the name of a cat', fakeAsync(() => {
    people$.next(people);
    tick();

    fixture.detectChanges();

    const liElements = fixture.debugElement.queryAll(By.css('li.catItem'));

    expect(liElements).toBeTruthy();
    expect(liElements.length).toBe(2);
    expect(liElements[0].nativeElement.textContent.trim()).toBe('Tom');
    expect(liElements[1].nativeElement.textContent.trim()).toBe('Garfield');
  }));

  it('should render two h2 elements for each gender', fakeAsync(() => {
    people$.next(people);
    tick();

    fixture.detectChanges();

    const h2Elements = fixture.debugElement.queryAll(By.css('h2'));

    expect(h2Elements.length).toBe(2);
    expect(h2Elements[0].nativeElement.textContent.trim()).toBe('Male');
    expect(h2Elements[1].nativeElement.textContent.trim()).toBe('Female');
  }));

});
