// import PasswordHelper from '../../../../src/shared/helpers/password';

// test('it should generate a random password with 8 characters', () => {
//   const password = PasswordHelper.generate();

//   expect(typeof password).toBe('string');
//   expect(password.length).toBe(8);
// });

// test('it should hash the password', () => {
//   const password = 'plain_password';
//   const hashedPassword = PasswordHelper.hash(password);

//   expect(hashedPassword).not.toEqual(password);
//   expect(hashedPassword).toContain('$2a$');
// });

// test('it should compare two differents passwords', () => {
//   expect(PasswordHelper.compare('pass01', 'pass02')).toBe(false);
// });

// test('it should compare two identical passwords', () => {
//   expect(PasswordHelper.compare('pass01', 'pass01')).toBe(true);
// });
