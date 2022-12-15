// class ExcludeHelper {
//   private readonly omitFields: string[];

//   constructor() {
//     this.omitFields = ['password', 'code', 'codeExpiresIn'];
//   }

//   public excludeFields(model: any) {
//     for (const field of this.omitFields) {
//       delete model[field];
//     }

//     return model;
//   }

//   public excludeFieldsArray(model: any) {
//     for (const element of model) {
//       for (const field of this.omitFields) {
//         delete element[field];
//       }
//     }

//     return model;
//   }
// }

// export default new ExcludeHelper();
