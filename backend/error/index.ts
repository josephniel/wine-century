export class CustomError extends Error {
  errorCode: string;
  errorMessage: string;
  statusCode: number;

  constructor(errorCode: string, errorMessage: string, statusCode: number) {
    super(errorMessage);

    this.errorCode = errorCode;
    this.errorMessage = errorMessage;
    this.statusCode = statusCode;
  }
}
