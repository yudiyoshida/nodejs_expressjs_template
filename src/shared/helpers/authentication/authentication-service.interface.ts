export interface IAuthenticationService {
  sign(payload: any): string;
  verify(token: string): any;
}
