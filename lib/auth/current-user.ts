import {cookies} from "next/headers"; import {db} from "@/lib/db/client"; import {verifySessionToken} from "./session";
export async function currentUser(){const token=(await cookies()).get("nexora_session")?.value;if(!token)return null;const id=verifySessionToken(token);if(!id)return null;return db.user.findUnique({where:{id},include:{candidate:true,company:true}});}
