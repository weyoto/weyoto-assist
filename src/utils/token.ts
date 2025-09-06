import Cookies from "universal-cookie";

const cookies = new Cookies();

export const authToken = () => cookies.get("authToken");

export const token = await authToken();

/* export const saveAuthToken = async (value: string) =>
  cookies.set("authToken", value);
 */
