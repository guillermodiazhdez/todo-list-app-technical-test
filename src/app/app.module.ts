import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddDutyComponent } from './components/add-duty/add-duty.component';
import { HeaderComponent } from './components/header/header.component';
import { DutiesListComponent } from './components/duties-list/duties-list.component';
import { DutiesService } from './services/duties.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    AddDutyComponent,
    HeaderComponent,
    DutiesListComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [DutiesService],
  bootstrap: [AppComponent],
})
export class AppModule {}
