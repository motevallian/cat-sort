import { ComponentFixture, TestBed } from '@angular/core/testing';
import {By} from '@angular/platform-browser';

import { GenderCatListComponent } from './gender-cat-list.component';

describe('GenderCatListComponent', () => {
  let component: GenderCatListComponent;
  let fixture: ComponentFixture<GenderCatListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ GenderCatListComponent ]
    });
  });

  describe('given catstList contains 3 cat names', () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(GenderCatListComponent);
      component = fixture.componentInstance;

      const {gender, catNames} = createCatsList();

      component.gender = gender;
      component.catsList = catNames;

      fixture.detectChanges();
    });

    it('should be created', () => {
      expect(component).toBeTruthy();
    });

    it('should the input gender set in a h2 tag', () => {
      const h2Element = fixture.debugElement.query(By.css('h2')).nativeElement;

      expect(h2Element.textContent.trim()).toBe('Male');
    });

    it('should have 3 li elements if 3 cats provided', () => {
      const dbgElements = fixture.debugElement.queryAll(By.css('.catItem'));
      const liElements = (dbgElements || []).map((dbgElement) => {
        return dbgElement.nativeElement;
      });

      expect(liElements.length).toBe(3);
      expect(liElements[0].textContent.trim()).toBe('Garfield');
      expect(liElements[1].textContent.trim()).toBe('Max');
      expect(liElements[2].textContent.trim()).toBe('Tom');
    });
  });

  describe('given catsList is empty', () => {
    it('should not have any ul elements', () => {
      fixture = TestBed.createComponent(GenderCatListComponent);
      component = fixture.componentInstance;

      component.gender = 'Male';
      component.catsList = [];

      fixture.detectChanges();
      const dbgElement = fixture.debugElement.query(By.css('ul.catsList'));

      expect(dbgElement).toBe(null);
    });
  });

  function createCatsList() {
    return {
      gender: 'Male',
      catNames: ['Garfield', 'Max', 'Tom']
    };
  }
});
