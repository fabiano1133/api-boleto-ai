export class TenantAllreadyExistsException extends Error {
  statusCode?: number;

  constructor(message: string) {
    super(message);
    this.message = message;
    this.statusCode = 422;
    this.name = this.name;
  }
}
