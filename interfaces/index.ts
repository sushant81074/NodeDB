export interface IinputParser {
  command: string;
  key: number | string;
  value: any;
  ttl: number;
}

export interface Iset {
  key: number | string;
  value: any;
  ttl: number;
}
