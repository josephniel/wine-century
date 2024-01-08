export interface APIConfig {
  port: number;
}

export const loadAPIConfig = (): APIConfig => {
  return {
    port: Number(process.env['API_PORT'] ?? 3030)
  };
};
