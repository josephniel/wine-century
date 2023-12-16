export interface APIConfig {
  port: number;
}

export const loadAPIConfig = (): APIConfig => {
  return {
    port: Number(process.env['PORT']) | 3030,
  }
};
