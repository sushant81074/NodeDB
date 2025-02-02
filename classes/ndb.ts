import type { IDel, IGet, IRename, ISet } from "../interfaces";

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
  append({ key, value }: ISet) {
    console.log(key, value);
    let apndVal = this.map.get(key) ? this.map.get(key) + value : value;
    this.map.set(key, apndVal);
    console.log(this.map);
  }
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
  rename({ oldKey, newKey }: IRename) {
    if (!oldKey || !newKey) {
      console.log(`${oldKey}&${newKey} are invalid`);
      return;
    }
    console.log(oldKey, newKey);
    let val = this.map.get(oldKey);
    if (val) {
      this.map.set(newKey, val);
      let ttl = this.expireKey.get(oldKey);
      if (ttl) this.expireKey.set(newKey, ttl);
      this.map.delete(oldKey);
      this.expireKey.delete(oldKey);
      console.log(this.map, this.expireKey);
    } else {
      console.error("key value not found");
    }
  }
  exists({ key }: IGet): boolean {
    console.log(key);
    let res: boolean = this.map.has(key);
    console.log("NodeDB>", res);
    return res;
  }
  expire({}) {}
  ttl({}) {}
  type({}) {}
}
