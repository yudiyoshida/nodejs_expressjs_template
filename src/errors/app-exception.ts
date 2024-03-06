class AppException extends Error {
  public error;
  public status;

  constructor(status: number, error: string | string[]) {
    super('AppException Error');
    this.error = error;
    this.status = status;
  }
}

export { AppException };
