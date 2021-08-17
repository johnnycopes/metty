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
  public clickAction$: Subject<number> = new Subject();

  public objectIds$: Observable<number[]>;
  public departments$: Observable<IDepartment[]>;
  public departments: FormControl = new FormControl();
  private _subscription: Subscription = new Subscription();

  constructor(
    private _metService: MetService,
    private _store: Store<IAppState>,
  ) { }

  ngOnInit(): void {
    this._initializeObservables();
  }

  public ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  public onSearch(): void {
    this.searchAction$.next();
  }

  public onClick(objectId: number): void {
    this.clickAction$.next(objectId);
  }

  private _initializeObservables(): void {
    const valueChanges$ = this.departments.valueChanges.subscribe(
      values => this._store.dispatch(updateDepartments({ departmentIds: values }))
    );
    const click$ = this.clickAction$.pipe(
      switchMap(objectId => this._metService.getObject(objectId))
    ).subscribe(console.log);

    this._subscription.add(valueChanges$);
    this._subscription.add(click$);

    this.departments$ = this._metService.getDepartments();
    this.objectIds$ = this.searchAction$.pipe(
      withLatestFrom(this._store.pipe(
        select(selectDepartments)
      ))
    ).pipe(
      switchMap(([_, departmentIds]) => this._metService.getObjects({ departmentIds })),
      map(response => response.objectIDs.slice(0, 50)),
    );
  }
}
