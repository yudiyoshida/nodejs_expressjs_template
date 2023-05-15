// import PaginationHelper from '../../../../src/shared/helpers/pagination';

// const RESULT: [any[], number] = [
//   [
//     { title: 'title 01' },
//     { title: 'title 02' },
//     { title: 'title 03' },
//     { title: 'title 04' },
//     { title: 'title 05' },
//   ], 5,
// ];

// test('it should have only one page (limit=10, page=1)', () => {
//   const resultPaginated = PaginationHelper.paginate(RESULT, 10, 1);

//   expect(resultPaginated).toHaveProperty('data');
//   expect(resultPaginated).toHaveProperty('totalItems');
//   expect(resultPaginated).toHaveProperty('totalPages');
//   expect(resultPaginated).toHaveProperty('itemsPerPage');
//   expect(resultPaginated).toHaveProperty('page');

//   expect(resultPaginated.data).toEqual(RESULT[0]);
//   expect(resultPaginated.totalItems).toBe(5);
//   expect(resultPaginated.totalPages).toBe(1);
//   expect(resultPaginated.itemsPerPage).toBe(10);
//   expect(resultPaginated.page).toBe(1);
// });

// test('it should have 3 pages with 2 items per page (limit=2, page=1)', () => {
//   const resultPaginated = PaginationHelper.paginate(RESULT, 2, 1);

//   expect(resultPaginated.totalItems).toBe(5);
//   expect(resultPaginated.totalPages).toBe(3);
//   expect(resultPaginated.itemsPerPage).toBe(2);
//   expect(resultPaginated.page).toBe(1);
// });

// test('it should have 2 pages with  (limit=2, page=1)', () => {
//   const resultPaginated = PaginationHelper.paginate(RESULT, 2, 1);

//   expect(resultPaginated.totalItems).toBe(5);
//   expect(resultPaginated.totalPages).toBe(3);
//   expect(resultPaginated.itemsPerPage).toBe(2);
//   expect(resultPaginated.page).toBe(1);
// });
