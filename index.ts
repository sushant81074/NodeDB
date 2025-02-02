import * as readline from "readline";
import { NodeDB } from "./classes/ndb";
import {
  commandTokenParser,
  delInputParser,
  getExistInputParser,
  renameInputParser,
  setAppendInputParser,
} from "./utility/inputParser";
import type { IDel, IGet, ISet } from "./interfaces";

export const io = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const db = new NodeDB();

io.setPrompt("NodeDB>");
io.prompt();

io.on("line", (input: string) => {
  if (!input.length) return;

  const command = commandTokenParser(input);
  if (!command) {
    console.error("no command found in input");
    return;
  }

  switch (command) {
    case "set":
      {
        const { key, value, ttl }: ISet = setAppendInputParser(input);

        db.set({ key, value, ttl });
      }
      break;
    case "get":
      {
        const { key }: IGet = getExistInputParser(input);
        db.get({ key });
      }
      break;
    case "append":
      {
        const { key, value, ttl } = setAppendInputParser(input);

        if (ttl && ttl !== Infinity)
          console.error("ttl isn't supported with append command");
        db.append({ key, value });
      }
      break;
    case "del":
      {
        const { keys }: IDel = delInputParser(input);
        db.del({ keys });
      }
      break;
    case "rename":
      {
        const { oldKey, newKey } = renameInputParser(input);
        db.rename({ oldKey, newKey });
      }
      break;
    case "exists":
      {
        const { key } = getExistInputParser(input);
        db.exists({ key });
      }
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
