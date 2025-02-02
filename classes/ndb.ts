import type { IDel, IGet, ISet } from "../interfaces";

export class NodeDB {
  map: Map<string | number, string | number>;
  expireKey: Map<string | number, number>;

  constructor() {
    this.map = new Map();
    this.expireKey = new Map();
    console.log("NodeDB init");
  }

  set({ key, value, ttl = Infinity }: ISet): string {
    console.log("--------", key, value, ttl, "--------");
    this.map.set(key, value);
    this.expireKey.set(key, ttl);
    console.log("this.map", this.map);
    console.log("this.expireKey", this.expireKey);
    console.log("NodeDB> Ok!");
    return "Ok!";
  }
  get({ key }: IGet): number | string | null {
    console.log(key);
    let val = this.map.get(key);
    let parsedVal = Number(val) ? Number(val) : val;
    console.log("NodeDB>", parsedVal ?? null, typeof parsedVal);
    return parsedVal ?? null;
  }
  append({}) {}
  del({ keys }: IDel) {
    console.log(keys);
    keys.forEach((key) => {
      let res = this.map.delete(key);
      this.expireKey.delete(key);
      console.log(res);
    });
    console.log("NodeDB> Ok!", this.map);
    return "Ok!";
  }
  rename({}) {}
  exists({ key }: IGet): boolean {
    console.log(key);
    let res: boolean;
    let val = this.map.get(key);
    val ? (res = true) : (res = false);
    console.log("NodeDB>", res);
    return res;
  }
  expire({}) {}
  ttl({}) {}
  type({}) {}
}
