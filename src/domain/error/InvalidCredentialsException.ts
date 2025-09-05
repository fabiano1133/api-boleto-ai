export class InvalidCredentialsException extends Error {
  statusCode?: number;

  constructor(message: string) {
    super(message);
    this.message = message;
    this.statusCode = 400;
    this.name = "Bad Request";
  }
}
