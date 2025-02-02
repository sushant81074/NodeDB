import type { IDel, IGet, IRename, ISet } from "../interfaces";

export function commandTokenParser(input: string): string {
  let inputArr = input.split(" ");
  inputArr = inputArr.filter((e) => e);
  return inputArr.length ? inputArr[0].toLowerCase() : "";
}

export function setAppendInputParser(input: string): ISet {
  // very important step to covert key into number if it is a number else keeping it string
  input = JSON.stringify(input);
  input = JSON.parse(input);

  // break whole input command
  let inputArr = input.split(" ");
  console.log("inputArr", inputArr);
  inputArr = inputArr.filter((e) => e);

  if (inputArr.length < 3) {
    console.error("invalid input command");
    return { key: 0, value: "", ttl: 0 };
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
  const value = inputArr[2];

  if (inputArr.length === 4) {
    console.log(inputArr.length);
    console.error("invalid input command after value, expected expiry");
    return { key: 0, value: "", ttl: 0 };
  }

  if (inputArr.length === 5 && inputArr[3] !== "ex") {
    console.log(inputArr[4]);
    console.error("invalid input command, expected expiry ex then ttl value");
    return { key: 0, value: "", ttl: 0 };
  }

  // convert ttl to number if it exists or else set default ttl which is inifnity
  let finalTtl: number | string = Infinity;
  if (inputArr.length === 5) {
    const ttl = inputArr[4];
    console.log("ttl", ttl);
    const parsedTtl = Number(ttl) ? Number(ttl) : ttl;
    console.log("parsedTtl", parsedTtl, typeof parsedTtl);
    if (typeof parsedTtl === "number") finalTtl = parsedTtl;

    if (typeof finalTtl !== "number" && typeof finalTtl !== "bigint") {
      console.error("invalid input value for ttl");
      return { key: 0, value: "", ttl: 0 };
    }
  }

  console.log("===", { key: finalKey, value, ttl: finalTtl });
  return { key: finalKey, value, ttl: finalTtl };
}

export function getExistInputParser(input: string): IGet {
  // same as setinputparser

  input = JSON.stringify(input);
  input = JSON.parse(input);

  // break input command into valid truthy values
  let inputArr = input.split(" ").filter((e) => e);
  console.log(input, inputArr);

  // check for the correct length of get command
  if (inputArr.length !== 2) {
    console.error("invalid input command arguments");
    return { key: 0 };
  }

  // coversion of key to correct type
  let key = inputArr[1];
  let parsedKey = Number(key) ? Number(key) : key;
  let finalKey = parsedKey;
  if (key.split("").includes("e") || key.split("").includes("n"))
    finalKey = key;

  return { key: finalKey };
}

export function delInputParser(input: string): IDel {
  // same as setinputparser
  input = JSON.stringify(input);
  input = JSON.parse(input);

  // break input command into valid truthy values
  let inputArr = input.split(" ").filter((e) => e);
  inputArr.shift(); /* removes del keyword*/
  console.log(input, inputArr);

  const finalKeys: Array<number | string> = [];

  inputArr.forEach((key) => {
    console.log(key, typeof key);
    let parsedKey = Number(key) ? Number(key) : key;
    let finalKey = parsedKey;
    if (key.split("").includes("e") || key.split("").includes("n"))
      finalKey = key;
    console.log(finalKey, typeof finalKey);
    finalKeys.push(finalKey);
  });

  return { keys: finalKeys };
}

export function renameInputParser(input: string): IRename {
  // same as setinputparser
  input = JSON.stringify(input);
  input = JSON.parse(input);

  // break input command into valid truthy values
  let inputArr = input.split(" ").filter((e) => e);
  console.log(input, inputArr);

  // check for the correct length of get command
  if (inputArr.length !== 3) {
    console.error(
      "invalid input command arguments, expected only oldKey and newKey"
    );
    return { oldKey: "", newKey: "" };
  }

  let finalKeys: any = [];
  inputArr.forEach((key, idx) => {
    if (idx !== 0) {
      let parsedKey = Number(key) ? Number(key) : key;
      let finalKey = parsedKey;
      if (key.split("").includes("e") || key.split("").includes("n"))
        finalKey = key;
      console.log(finalKey, typeof finalKey);
      finalKeys.push(finalKey);
    }
  });

  if (finalKeys.length !== 2) {
    console.error("invalid input keys");
    return { oldKey: "", newKey: "" };
  }

  return { oldKey: finalKeys[0], newKey: finalKeys[1] };
}
