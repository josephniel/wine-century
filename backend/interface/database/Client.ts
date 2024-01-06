export interface Client {
  connect: () => Promise<void>;
  end: () => Promise<void>;
  query: (query: string, values: object[]) => Promise<object[]>;
}
