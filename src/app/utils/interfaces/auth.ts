export interface Auth {
  id: number;
  is_admin: boolean;
  type: string;
  permissions: any[]; //TODO: Refactoring!
}
