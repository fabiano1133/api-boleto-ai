export class BoletoStatusChangeNotAllowedException extends Error {
  statusCode?: number;

  constructor(message: string) {
    super(message);
    this.message = message;
    this.statusCode = 422;
  }
}
