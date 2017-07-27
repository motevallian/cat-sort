import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {LoadPeopleService} from './people.service/load-people.service';
import {CatsExtractorService} from './cats.service/cats-extractor.service';
import {HttpModule} from '@angular/http';
import { GenderCatListComponent } from './gender-cat-list/gender-cat-list.component';
import { CatsListComponent } from './cats-list/cats-list.component';

@NgModule({
  declarations: [
    AppComponent,
    GenderCatListComponent,
    CatsListComponent
  ],
  imports: [
    BrowserModule,
    HttpModule
  ],
  providers: [
    LoadPeopleService,
    CatsExtractorService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
