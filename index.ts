import * as readline from "readline";
import { NodeDB } from "./classes/ndb";
import { inputParser } from "./utility/inputParser";
import type { IinputParser } from "./interfaces";

export const io = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const db = new NodeDB();

io.setPrompt("NodeDB>");
io.prompt();

io.on("line", (input: string) => {
  const { command, key, value, ttl }: IinputParser = inputParser(input);

  if (!command && !key && !value) return;

  switch (command) {
    case "set":
      db.set({ key, value, ttl });
      break;
    case "get":
      db.get({});
      break;
    case "append":
      db.append({});
      break;
    case "del":
      db.del({});
      break;
    case "rename":
      db.rename({});
      break;
    case "exists":
      db.exists({});
      break;
    case "expire":
      db.expire({});
      break;
    case "ttl":
      db.ttl({});
      break;
    case "type":
      db.type({});
      break;
    default:
      console.log(`no command found named: ${command}`);
      break;
  }
}).on("close", () => {
  console.log("\nexiting NodeDB....");
  process.exit(0);
});

// You can now create an instance of NodeDB:
