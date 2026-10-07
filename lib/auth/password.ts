import { createHash } from "crypto";
export function hashPassword(value:string){return createHash("sha256").update(value).digest("hex")}
export function verifyPassword(value:string,stored:string){return hashPassword(value)===stored}