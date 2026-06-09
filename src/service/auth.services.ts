import { authKey } from "@/constant";
import { decodedToken } from "@/utils/jwt_decode";

import {
  getFromLocalStorage,
  removeFromLocalStorage,
  setToLocalStorage,
} from "@/utils/localStorage";

export type TDecodedUser = {
  email: string;
  role: string;
  user_id: string;
};
// * STORE TOKEN INTO LOCAL STORAGE
export const storeUserInLocalStorage = (token: string) => {
  return setToLocalStorage(authKey, token);
};

// * GET TOKEN FROM LOCAL STORAGE

export const getToken = () => {
  const token = getFromLocalStorage(authKey);
  return token;
};

// * GET USER INFO FROM LOCAL STORAGE

export const getUserInformation = () => {
  const token = getFromLocalStorage(authKey);
  const decode = decodedToken(token as string) as TDecodedUser;
  return decode;
};

// * LOG OUT USER FROM THE SYSTEM
export const logoutUserFromSystem = () => {
  return removeFromLocalStorage(authKey);
};
