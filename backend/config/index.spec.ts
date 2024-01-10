import { loadConfig } from '.';

describe('Config', () => {
  let oldEnv: NodeJS.ProcessEnv = {};

  beforeEach(() => {
    oldEnv = process.env;

    process.env['API_PORT'] = '9876';
    process.env['DATABASE_HOST'] = 'localhost';
    process.env['DATABASE_USER'] = 'user';
    process.env['DATABASE_PASSWORD'] = 'password';
    process.env['DATABASE_NAME'] = 'database';
  });

  afterEach(() => {
    process.env = oldEnv;
  });

  it('should read from the environment variables', () => {
    const config = loadConfig();
    expect(config).toStrictEqual({
      api: {
        port: 9876
      },
      database: {
        host: 'localhost',
        user: 'user',
        password: 'password',
        name: 'database'
      }
    });
  });
});
