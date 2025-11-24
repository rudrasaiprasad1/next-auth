import { NextRequest } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";
interface DecodedUser extends JwtPayload {
  id: string;
  email?: string;
}
export const getDataFromToken = async (request: NextRequest) => {
  try {
    const token = request.cookies.get("token")?.value || "";
    const decodedUser = jwt.verify(
      token,
      process.env.TOKEN_SECRET!
    ) as DecodedUser;
    return decodedUser?.id;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
};
