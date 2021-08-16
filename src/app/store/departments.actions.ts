import { createAction, props } from "@ngrx/store";
import { IDepartment } from "../models/department.interface";

const source = "[Departments]";

export const updateDepartments = createAction(
  `${source} Update Departments`,
  props<{ departmentIds: number[] }>(),
);
