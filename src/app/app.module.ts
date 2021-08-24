import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ObjectsComponent } from './components/objects/objects.component';
import { SearchComponent } from './components/search/search.component';
import { ShellComponent } from './components/shell/shell.component';
import { departmentsReducer } from "./store/departments.reducer";

@NgModule({
  declarations: [
    AppComponent,
    ObjectsComponent,
    SearchComponent,
    ShellComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forRoot({
      departments: departmentsReducer,
    }),
    HttpClientModule,
    MatButtonModule,
    MatChipsModule,
    MatListModule,
    MatSelectModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
