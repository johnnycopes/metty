import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from "@angular/forms";
import { select, Store } from "@ngrx/store";
import { Observable, Subject, Subscription } from "rxjs";
import { map, switchMap, tap, withLatestFrom } from "rxjs/operators";

import { IDepartment } from "src/app/models/department.interface";
import { MetService } from "src/app/services/met.service";
import { selectDepartments } from "src/app/store/app.selectors";
import { IAppState } from "src/app/store/app.state";
import { updateDepartments } from "src/app/store/departments.actions";

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss']
})
export class ShellComponent implements OnInit, OnDestroy {
  public searchAction$: Subject<void> = new Subject();
  public objects$: Observable<any[]>;
  public departments$: Observable<IDepartment[]>;
  public departments: FormControl = new FormControl();
  private _subscription: Subscription = new Subscription();

  constructor(
    private _metService: MetService,
    private _store: Store<IAppState>,
  ) { }

  ngOnInit(): void {
    const valueChanges$ = this.departments.valueChanges.subscribe(
      values => this._store.dispatch(updateDepartments({ departmentIds: values }))
    );
    const departments$ = this._store.pipe(
      select(selectDepartments)
    );

    this._subscription.add(valueChanges$);
    this.departments$ = this._metService.getDepartments();
    this.objects$ = this.searchAction$.pipe(
      withLatestFrom(departments$)
    ).pipe(
      switchMap(([_, departmentIds]) => this._metService.getObjects({ departmentIds })),
      map(response => response.objectIDs.slice(0, 50)),
    );
  }

  public ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  public onSearch(): void {
    this.searchAction$.next();
  }
}
