export interface APIConfig {
  port: number;
  corsAllowList: string[];
}

export const loadAPIConfig = (): APIConfig => {
  return {
    port: Number(process.env['API_PORT'] ?? 3030),
    corsAllowList: (process.env['API_CORS_ALLOW_LIST'] ?? 'http://localhost:3000').split(',')
  };
};
