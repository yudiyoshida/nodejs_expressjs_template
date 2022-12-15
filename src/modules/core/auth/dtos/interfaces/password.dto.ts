export interface IForgotPassword {
  email: string;
}

export interface IResetPassword {
  confirmPassword: string;
  password: string;
  code: string;
  email: string;
}

export interface IUpdatePassword {
  confirmPassword: string;
  newPassword: string;
  currentPassword: string;
}
