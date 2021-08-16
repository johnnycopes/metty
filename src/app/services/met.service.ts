import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { map, tap } from "rxjs/operators"
;
import { IDepartment } from "../models/department.interface";

interface IGetObjectsArgs {
  /** Returns any objects in a specific department */
  departmentIds?: ReadonlyArray<number>;
}

interface IGetObjectsResponse {
  /** The total number of publicly-available objects */
  total: number;
  /** An array containing the object ID of publicly-available object */
  objectIDs: ReadonlyArray<number>;
}

@Injectable({
  providedIn: 'root'
})
export class MetService {
  private _apiUrl = "https://collectionapi.metmuseum.org/public/collection/v1/"

  constructor(private _http: HttpClient) { }

  public getDepartments(): Observable<IDepartment[]> {
    return this._http
      .get<{ departments: IDepartment[] }>(this._apiUrl + "departments")
      .pipe(
        map(obj => obj.departments)
      );
  }

  public getObjects({ departmentIds }: IGetObjectsArgs): Observable<IGetObjectsResponse> {
    const options = {
      params: {
        departmentIds: departmentIds?.join("|") ?? "",
      },
    };
    return this._http
      .get<IGetObjectsResponse>(this._apiUrl + "objects", options);
  }
}
