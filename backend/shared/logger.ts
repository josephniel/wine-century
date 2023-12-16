import pino, { Logger as PinoLogger } from 'pino';

export class Logger {
  private logger: PinoLogger;

  constructor() {
    this.logger = pino();
  }

  public info = (msg: string, ...args: any[]) => {
    this.logger.info({}, msg, ...args);
  };

  public warn = (msg: string, ...args: any[]) => {
    this.logger.warn({}, msg, ...args);
  };

  public error = (msg: string, ...args: any[]) => {
    this.logger.error({}, msg, ...args);
  };
}

export default {
  Logger,
};
