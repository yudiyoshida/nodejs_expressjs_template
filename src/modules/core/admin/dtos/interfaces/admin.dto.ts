export interface ICreateAdmin {
  permissions: number[]
  imageKey?: string;
  imageUrl?: string;
  birthday?: string | Date;
  document: string;
  phone: string;
  password: string;
  email: string;
  name: string;
}
