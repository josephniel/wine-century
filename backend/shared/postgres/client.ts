import pg from 'pg';

import { type DatabaseConfig } from '../config/database';
import { type Client as DatabaseClient } from '../../interface/database/Client';

export class Client implements DatabaseClient {
  private readonly client: pg.Client;

  constructor(config: DatabaseConfig) {
    this.client = new pg.Client({
      host: config.host,
      user: config.user,
      password: config.password,
      database: config.database
    });
  }

  async connect(): Promise<void> {
    await this.client.connect();
  }

  async end(): Promise<void> {
    await this.client.end();
  }

  async query(query: string, values: any[]): Promise<object[]> {
    const result = await this.client.query(query, values);
    return result.rows;
  }
}
