import type { IinputParser } from "../interfaces";

export function inputParser(input: string): IinputParser {
  // very important step to covert key into number if it is a number else keeping it string
  input = JSON.stringify(input);
  input = JSON.parse(input);

  // break whole input command
  let inputArr = input.split(" ");
  inputArr = inputArr.filter((e) => e);

  if (inputArr.length < 3) {
    console.error("invalid input command");
    return { command: "", key: 0, value: "", ttl: 0 };
  }

  // covert command to standard lowercase string
  const command = inputArr[0].toLowerCase();

  // operation required to convert key to correct type
  const key = inputArr[1];
  const parsedKey = Number(key) ? Number(key) : key;
  let finalKey = parsedKey;
  if (key.split("").includes("e") || key.split("").includes("n"))
    finalKey = key;

  // operation to convert value to string
  const value = JSON.stringify(inputArr[2]);

  if (inputArr.length === 4) {
    console.log(inputArr.length);
    console.error("invalid input command after value, expected expiry");
    return { command: "", key: 0, value: "", ttl: 0 };
  }

  if (inputArr.length === 5 && inputArr[3] !== "ex") {
    console.log(inputArr[4]);
    console.error("invalid input command, expected expiry ex then ttl value");
    return { command: "", key: 0, value: "", ttl: 0 };
  }

  // convert ttl to number if it exists or else set default ttl which is inifnity
  let finalTtl: number | string = Infinity;
  if (inputArr.length === 5) {
    const ttl = inputArr[4];
    console.log("ttl", ttl);
    const parsedTtl = Number(ttl) ? Number(ttl) : ttl;
    console.log("parsedTtl", parsedTtl);
    finalTtl = parsedTtl;
    console.log(ttl, parsedTtl, finalTtl);
    console.log(typeof ttl, typeof parsedTtl, typeof finalTtl);

    if (typeof finalTtl !== "number" && typeof finalTtl !== "bigint") {
      console.error("invalid input value for ttl");
      return { command: "", key: 0, value: "", ttl: 0 };
    }
  }

  console.log("===", { command, key: finalKey, value, ttl: finalTtl });
  return { command, key: finalKey, value, ttl: finalTtl };
}
