// userLogin.ts
"use server";

import { FieldValues } from "react-hook-form";
import setAccessToken from "./setTokenCookie";
import { jwtDecode } from "jwt-decode";
import { TToken } from "@/interfaces";

export const userLogin = async (data: FieldValues) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API}/auth/login`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        credentials: "include",
      },
    );
    const result = await res.json();

    if (result?.success) {
      await setAccessToken(result?.data?.accessToken);
      const redirectPath = getRoleBaseRedirect(result?.data?.accessToken);
      return { ...result, redirectPath };
    }

    return result;
  } catch (error) {}
};

const getRoleBaseRedirect = (token: string) => {
  const info = jwtDecode(token) as TToken;
  switch (info?.role) {
    case "NON_SKILL_PROVIDER":
      return "/dashboard/general-provider";
    case "ADMIN":
      return "/dashboard/admin";
    case "CONSUMER":
      return "/dashboard/consumer";
    default:
      return "/";
  }
};
