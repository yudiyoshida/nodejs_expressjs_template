export interface ICreateUser {
  address: {
    state: string;
    city: string;
    district: string;
    reference?: string;
    complement?: string;
    number: string;
    street: string;
    zipcode: string;
    nickname?: string;
  },
  imageKey?: string;
  imageUrl?: string;
  birthday?: string | Date;
  document: string;
  phone: string;
  confirmPassword: string;
  password: string;
  email: string;
  name: string;
}
