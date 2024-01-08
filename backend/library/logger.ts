import pino, { type Logger as PinoLogger } from 'pino';

export class Logger {
  private readonly logger: PinoLogger;

  constructor() {
    this.logger = pino();
  }

  public info = (msg: string, ...args: any[]): void => {
    this.logger.info({}, msg, args);
  };

  public warn = (msg: string, ...args: any[]): void => {
    this.logger.warn({}, msg, args);
  };

  public error = (msg: string, ...args: any[]): void => {
    this.logger.error({}, msg, args);
  };
}

export default {
  Logger
};
