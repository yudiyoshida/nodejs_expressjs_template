export interface IHashingService {
  compare(password: string, hashedPassword: string): boolean
  hash(text: string, saltOrRounds?: string | number): string
}
