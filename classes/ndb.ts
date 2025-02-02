import type { Iset } from "../interfaces";

export class NodeDB {
  map: Map<string | number, string | number>;
  expireKey: Map<string | number, number>;
  constructor() {
    this.map = new Map();
    this.expireKey = new Map();
    console.log("NodeDB init", this.map);
  }

  set({ key, value, ttl = Infinity }: Iset) {
    console.log(key, value, ttl);
    this.map.set(key, value);
    this.expireKey.set(key, ttl);
  }
  get({}) {}
  append({}) {}
  del({}) {}
  rename({}) {}
  exists({}) {}
  expire({}) {}
  ttl({}) {}
  type({}) {}
}
