import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { forkJoin, Observable } from 'rxjs';
import { withLatestFrom, switchMap, map } from 'rxjs/operators';

import { IAppState } from 'src/app/store/app.state';
import { IObject } from 'src/app/models/object.interface';
import { EEvent, EventService } from 'src/app/services/event.service';
import { MetService } from 'src/app/services/met.service';
import { selectDepartments } from 'src/app/store/app.selectors';

@Component({
  selector: 'app-objects',
  templateUrl: './objects.component.html',
  styleUrls: ['./objects.component.scss']
})
export class ObjectsComponent implements OnInit {
  public objects$: Observable<IObject[]>;

  constructor(
    private _eventService: EventService,
    private _metService: MetService,
    private _store: Store<IAppState>,
  ) { }

  public ngOnInit(): void {
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

  public onClick(object: IObject): void {
    console.log(object.objectID, object);
  }
}
