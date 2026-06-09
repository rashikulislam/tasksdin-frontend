import { removeFromLocalStorage } from "@/utils/localStorage";
import { deleteCookie } from "./deleteCookie";
import { authKey } from "@/constant";

export const logOutUserFromSystem = () => {
  deleteCookie();
  removeFromLocalStorage(authKey);
};
