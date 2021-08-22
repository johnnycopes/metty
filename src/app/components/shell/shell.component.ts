import { Component, OnInit } from '@angular/core';
import { select, Store } from "@ngrx/store";
import { forkJoin, Observable, Subject } from "rxjs";
import { map, switchMap, withLatestFrom } from "rxjs/operators";

import { IObject } from "src/app/models/object.interface";
import { MetService } from "src/app/services/met.service";
import { EEvent, EventService } from "src/app/services/event.service";
import { selectDepartments } from "src/app/store/app.selectors";
import { IAppState } from "src/app/store/app.state";

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss']
})
export class ShellComponent implements OnInit {
  public objects$: Observable<IObject[]>;

  constructor(
    private _metService: MetService,
    private _eventService: EventService,
    private _store: Store<IAppState>,
  ) { }

  public ngOnInit(): void {
    this._initializeObservables();
  }

  public onClick(object: IObject): void {
    console.log(object.objectID, object);
  }

  private _initializeObservables(): void {
    this.objects$ = this._eventService.listen(EEvent.search).pipe(
      withLatestFrom(this._store.pipe(
        select(selectDepartments)
      ))
    ).pipe(
      switchMap(([_, departmentIds]) => this._metService.getObjects({ departmentIds })),
      map(response => response.objectIDs.slice(0, 25)),
      map(ids => ids.map(id => this._metService.getObject(id))),
      switchMap(objects => forkJoin(objects))
    );
  }
}
