export function inputParser(input: string): {
  command: string;
  key: number | string;
  value: any;
  ttl: number;
} {
  const { value, ttl } = {
    value: "",
    ttl: 0,
  };
  // very important step to covert key into number if it is a number else keeping it string
  input = JSON.stringify(input);
  input = JSON.parse(input);

  // break whole input command
  const inputArr = input.split(" ");

  // covert command to standard lowercase string
  const command = inputArr[0].toLowerCase();

  // operation required to convert key to correct type
  const key = inputArr[1];
  const parsedKey = Number(key);
  let finalKey;
  if (key.split("").includes("e") || key.split("").includes("n"))
    finalKey = key;
  else finalKey = parsedKey;

  console.log({ command, key: finalKey, value, ttl });
  return { command, key: finalKey, value, ttl };
}
