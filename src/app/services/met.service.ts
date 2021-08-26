import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Observable, of } from "rxjs";
import { map, tap } from "rxjs/operators"
;
import { IDepartment } from "../models/department.interface";
import { IObject } from "../models/object.interface";

@Injectable({
  providedIn: 'root'
})
export class MetService {
  private _apiUrl = "https://collectionapi.metmuseum.org/public/collection/v1"

  constructor(private _http: HttpClient) { }

  public getDepartments(): Observable<IDepartment[]> {
    return this._http
      .get<{ departments: IDepartment[] }>(this._apiUrl + "/departments")
      .pipe(
        map(obj => obj.departments)
      );
  }

  public getObjects({ departmentIds }: {
    /** Returns any objects in a specific department */
    departmentIds?: ReadonlyArray<number>;
  }): Observable<{
    total: number;
    objectIDs: ReadonlyArray<number>;
  }> {
    if (!departmentIds) {
      return of({ total: 0, objectIDs: [] });
    }
    return this._http
      .get<{
        total: number;
        objectIDs: ReadonlyArray<number>;
      }>(this._apiUrl + "/objects", {
        params: {
          departmentIds: departmentIds?.join("|"),
        },
      });
  }

  public getObject(id: number): Observable<IObject> {
    return this._http
      .get<IObject>(`${this._apiUrl}/objects/${id}`);
  }
}
