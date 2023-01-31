import { Prisma } from '@prisma/client';

// input
export interface ILoginDTO {
  username: string;
  password: string;
}

export interface IForgotPasswordDTO {
  email: string;
}

export interface IResetPasswordDTO {
  email: string;
  code: string;
  password: string;
  passwordConfirmation: string;
}

export interface IUpdatePasswordDTO {
  currentPassword: string;
  newPassword: string;
  passwordConfirmation: string;
}

export interface IValidateFieldsDTO {
  email: string;
  document: string;
  phone: string;
}

export interface IValidateCodeDTO {
  email: string;
  code: string;
}

// output
export const AccountDTO = Prisma.validator<Prisma.UserSelect>()({
  id: true,
  isAdmin: true,
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
  permissions: true,
});
