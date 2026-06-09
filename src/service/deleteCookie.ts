"use server";

import { authKey } from "@/constant";
import { cookies } from "next/headers";

export const deleteCookie = async () => {
  const cookieStore = await cookies();
  cookieStore.delete(authKey);
};
