export interface IDepartment {
  /** The departmentId is to be used as a query parameter on the `/objects` endpoint */
  departmentId: number;
  /** Display name for a department */
  displayName: string;
}
