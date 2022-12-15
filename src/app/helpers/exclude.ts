// TODO: create interface and type function return.
class ExcludeHelper {
  private readonly user: string[];

  constructor() {
    this.user = ['password', 'code', 'code_expires_in'];
  }

  excludeFields(model: any) {
    for (const key of this.user) {
      delete model[key];
    }

    return model;
  }

  excludeFieldsArray(model: any) {
    for (const element of model) {
      for (const key of this.user) {
        delete element[key];
      }
    }

    return model;
  }
}

export default new ExcludeHelper();
