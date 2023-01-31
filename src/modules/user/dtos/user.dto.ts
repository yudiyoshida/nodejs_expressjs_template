import { Prisma } from '@prisma/client';

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
  address: {
    nickname?: string;
    zipcode: string;
    street: string;
    number: string;
    complement?: string;
    reference?: string;
    district: string;
    city: string;
    state: string;
  }
}

// output
export const UserDTO = Prisma.validator<Prisma.UserSelect>()({
  id: true,
  isAdmin: true,
  type: true,
  name: true,
  email: true,
  status: true,
  phone: true,
  document: true,
  birthday: true,
  imageUrl: true,
  imageKey: true,
  createdAt: true,
  updatedAt: true,
});

export const UserWithAddressesDTO = Prisma.validator<Prisma.UserSelect>()({
  ...UserDTO,
  addresses: true,
});
