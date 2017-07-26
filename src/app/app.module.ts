import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {LoadPeopleService} from './people.service/load-people.service';
import {CatsExtractorService} from './cats.service/cats-extractor.service';
import {HttpModule} from '@angular/http';

@NgModule({
  declarations: [
    AppComponent
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
