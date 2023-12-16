import { APIConfig, loadAPIConfig } from "./api";

export interface Config {
  api: APIConfig;
}

export const loadConfig = (): Config => ({
  api: loadAPIConfig(),
});