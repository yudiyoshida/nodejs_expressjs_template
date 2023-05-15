// import CodeHelper from '../../../../src/shared/helpers/code';

// test('it should return a code with 4 characters', () => {
//   const { code } = CodeHelper.generate(10);

//   expect(typeof code).toBe('string');
//   expect(code.length).toBe(4);
// });

// test('it should return a code that expires in 10 minutes', () => {
//   const { codeExpiresIn } = CodeHelper.generate(10);
//   const now = new Date();

//   expect(codeExpiresIn.getMinutes()).toEqual(new Date(now.setMinutes(now.getMinutes() + 10)).getMinutes());
// });

// test('it should return false (sending valid code)', () => {
//   const now = new Date();
//   const validCode = new Date(now.setMinutes(now.getMinutes() + 10));

//   expect(CodeHelper.isExpired(validCode)).toBe(false);
// });

// test('it should return true (sending expired code)', () => {
//   const now = new Date();
//   const validCode = new Date(now.setMinutes(now.getMinutes() - 10));

//   expect(CodeHelper.isExpired(validCode)).toBe(true);
// });
