// abstract class BaseService {
//   protected repository: any;

//   constructor(repository: any) {
//     this.repository = repository;
//   }

//   async findById(id: number | string) {
//     return await this.repository.findUnique({
//       where: { id },
//     });
//   }

//   async create(data: any) {
//     return await this.repository.create({
//       data,
//     });
//   }

//   async update(id: number, data: any) {
//     return await this.repository.update({
//       where: { id },
//       data,
//     });
//   }

//   async delete(id: number) {
//     return await this.repository.delete({
//       where: { id },
//     });
//   }

//   async updateStatus(id: number, status: string) {
//     return await this.repository.update({
//       where: { id },
//       data: { status },
//     });
//   }
// }

// export default BaseService;
