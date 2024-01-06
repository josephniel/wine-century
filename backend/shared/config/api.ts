export interface APIConfig {
  port: number;

  privateKey: string;
  publicKey: string;
}

export const loadAPIConfig = (): APIConfig => {
  return {
    port: Number(process.env['API_PORT']) ?? 3030,

    privateKey: process.env['API_PRIVATE_KEY'] ?? '',
    publicKey: process.env['API_PUBLIC_KEY'] ?? ''
  };
};
