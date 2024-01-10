export interface Database {
  connect: () => Promise<void>;
  end: () => Promise<void>;
  query: (query: string, values: any[]) => Promise<object[]>;
}
