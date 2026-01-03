import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export const getUserFromToken = async () => {
  try {
    const token = (await cookies()).get("token")?.value;
    if (!token) return null;

    const decoded = jwt.verify(token, process.env.TOKEN_SECRET!);

    return decoded;
  } catch {
    return null;
  }
};
