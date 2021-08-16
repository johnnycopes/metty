import { createReducer, on } from "@ngrx/store";
import { updateDepartments } from "./departments.actions";

export const initialState: ReadonlyArray<number> = [];

export const departmentsReducer = createReducer(
  initialState,
  on(updateDepartments, (_, { departmentIds }) => departmentIds),
);
