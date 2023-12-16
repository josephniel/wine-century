import { ExpressAPI } from "./interface/server";
import { loadConfig } from "./shared/config";
import { Logger } from "./shared/logger";

void (() => {
  const config = loadConfig();
  const logger = new Logger();

  (new ExpressAPI(config.api, logger)).run();
})();
