import { Component, OnInit } from '@angular/core';
import { FormControl } from "@angular/forms";
import { Observable } from "rxjs";

import { IDepartment } from "src/app/models/department.interface";
import { MetService } from "src/app/services/met.service";

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss']
})
export class ShellComponent implements OnInit {
  public departments$: Observable<IDepartment[]> = this._metService.getDepartments();
  public departments: FormControl = new FormControl();

  constructor(private _metService: MetService) { }

  ngOnInit(): void {
    this._metService.getObjects({ departmentIds: [2,3,5] }).subscribe();
  }

}
