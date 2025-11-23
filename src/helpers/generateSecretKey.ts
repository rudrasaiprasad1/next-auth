import * as crypto from "crypto";

export function generateSecretKey(lengthBytes: number = 32): string {
  return crypto.randomBytes(lengthBytes).toString("base64");
}

/* Example :
    const jwtSecret: string = generateSecretKey();
    console.log("Generated JWT Secret:", jwtSecret);
*/
