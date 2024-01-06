import { loadConfig } from '.';

describe('Config', () => {
  let oldEnv: NodeJS.ProcessEnv = {};

  beforeEach(() => {
    oldEnv = process.env;

    process.env['API_PORT'] = '9876';
    process.env['API_PRIVATE_KEY'] = 'mock-private-key';
    process.env['API_PUBLIC_KEY'] = 'mock-public-key';
  });

  afterEach(() => {
    process.env = oldEnv;
  });

  it('should read from the environment variables', () => {
    const config = loadConfig();
    expect(config).toStrictEqual({
      api: {
        port: 9876,
        privateKey: 'mock-private-key',
        publicKey: 'mock-public-key'
      }
    });
  });
});
