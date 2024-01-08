export interface Cache {
  get: (key: string) => string;
  set: (key: string, value: string) => void;
}
