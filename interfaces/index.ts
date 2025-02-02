export interface ISet {
  key: number | string;
  value: any;
  ttl?: number;
}

export interface IGet {
  key: number | string;
}

export interface IDel {
  keys: Array<number | string>;
}

export interface IRename {
  oldKey: number | string;
  newKey: number | string;
}
