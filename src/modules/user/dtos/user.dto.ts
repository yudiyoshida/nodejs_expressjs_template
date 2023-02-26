import { Prisma } from '@prisma/client';

interface IAddressDTO {
  nickname?: string;
  zipcode: string;
  street: string;
  number: string;
  complement?: string;
  reference?: string;
  neighborhood: string;
  city: string;
  state: string;
  lat?: string;
  lng?: string;
}

// input
export interface ICreateUserDTO {
  type: string;
  name: string;
  birthday: Date;
  document: string;
  phone: string;
  email: string;
  password: string;
  passwordConfirmation: string;
  imageKey?: string;
  imageUrl?: string;
  address: IAddressDTO;
}

export interface IUpdateUserDTO {
  name: string;
  birthday: Date;
  document: string;
  phone: string;
  email: string;
  imageKey?: string;
  imageUrl?: string;
  address: IAddressDTO;
}

// output
export const UserDTO = Prisma.validator<Prisma.UserSelect>()({
  id: true,
  isAdmin: false,
  type: true,
  name: true,
  birthday: true,
  document: true,
  phone: true,
  email: true,
  password: false,
  status: true,
  imageKey: true,
  imageUrl: true,
  code: false,
  codeExpiresIn: false,
  createdAt: true,
  updatedAt: true,
});

export const UserWithAddressDTO = Prisma.validator<Prisma.UserSelect>()({
  ...UserDTO,
  address: true,
});
