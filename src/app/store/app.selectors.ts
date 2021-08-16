import { createSelector } from "@ngrx/store";

import { IAppState } from "./app.state";

export const selectDepartments = (state: IAppState) => state.departments;
