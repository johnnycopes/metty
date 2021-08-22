import { Injectable } from '@angular/core';
import { Observable, Subject } from "rxjs";
import { filter, map, tap } from "rxjs/operators";

export enum EEvent {
  search = 1,
}

export interface IGlobalEvent<TValue> {
  type: EEvent;
  value?: TValue;
}

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private _event = new Subject<IGlobalEvent<any>>();

  constructor() { }

  public send<TValue>({ type, value }: IGlobalEvent<TValue>): void {
    this._event.next({
      type,
      value,
    });
  }

  public listen<TValue>(type: EEvent): Observable<TValue> {
    return this._event.pipe(
      filter(event => event.type === type),
      map(event => event.value),
    );
  }
}
