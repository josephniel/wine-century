export interface DatabaseConfig {
  host: string;
  user: string;
  password: string;
  name: string;
}

export const loadDatabaseConfig = (): DatabaseConfig => {
  return {
    host: process.env['DATABASE_HOST'] ?? '127.0.0.1',
    user: process.env['DATABASE_USER'] ?? 'user',
    password: process.env['DATABASE_PASSWORD'] ?? 'password',
    name: process.env['DATABASE_NAME'] ?? 'winecentury'
  };
};
