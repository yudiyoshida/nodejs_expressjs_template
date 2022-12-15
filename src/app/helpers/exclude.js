class ExcludeHelper {
  excludeFields(model, ...keys) {
    for (let key of keys) {
      delete model[key];
    }
    
    return model;
  }

  excludeFieldsArray(model, ...keys) {
    for (let element of model) {
      for (let key of keys) {
        delete element[key];
      }
    }
    
    return model;
  }
}

module.exports = new ExcludeHelper();