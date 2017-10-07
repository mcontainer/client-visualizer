export class LogMessage {
  message: string;
  isErrorMessage: boolean;

  constructor(message: string, isErrorMessage: boolean) {
    this.message = message;
    this.isErrorMessage = isErrorMessage;
  }
}
