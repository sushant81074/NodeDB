export class NodeDB {
  map: Map<string | number, string | number>;
  constructor() {
    this.map = new Map();
    this.map.set(1, "eheh");
    this.map.set("1", "eheh");
    console.log("NodeDB init", this.map);
  }

  set({}) {}
  get({}) {}
  append({}) {}
  del({}) {}
  rename({}) {}
  exists({}) {}
  expire({}) {}
  ttl({}) {}
  type({}) {}
}
