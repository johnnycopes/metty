import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl } from "@angular/forms";
import { Store } from "@ngrx/store";
import { Observable, Subscription } from "rxjs";

import { IAppState } from "src/app/store/app.state";
import { updateDepartments } from "src/app/store/departments.actions";
import { IDepartment } from "src/app/models/department.interface";
import { MetService } from "src/app/services/met.service";
import { EEvent, EventService } from "src/app/services/event.service";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, OnDestroy {
  public departments$: Observable<IDepartment[]>;
  public departments = new FormControl();
  private _subscription = new Subscription();

  constructor(
    private _metService: MetService,
    private _eventService: EventService,
    private _store: Store<IAppState>,
  ) { }

  public ngOnInit(): void {
    const valueChanges$ = this.departments.valueChanges.subscribe(
      values => this._store.dispatch(updateDepartments({ departmentIds: values }))
    );
    this._subscription.add(valueChanges$);

    this.departments$ = this._metService.getDepartments();
  }

  public ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  public onClick(): void {
    this._eventService.send({ type: EEvent.search });
  }
}
