import { loadConfig } from "./config";
import { ExpressAPI } from "./interface/api/express";
import { Logger } from "./logger";

void (() => {
  const config = loadConfig();
  const logger = new Logger();

  (new ExpressAPI(config.api, logger)).run();
})();