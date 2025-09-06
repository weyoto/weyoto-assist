import { toast } from "sonner";
import { baseUrl } from "../baseUrl";
import Cookies from "universal-cookie";

export const verifyCode = async (email: string, code: string) => {
  const today = new Date();
  const twoWeeksFromToday = new Date(today);
  const cookies = new Cookies();
  try {
    const response = await fetch(`${baseUrl}/auth/verify-code`, {
      method: "POST",
      headers: {
        accept: "Application/json",
        "content-type": "Application/json",
      },
      body: JSON.stringify({
        email,
        code,
      }),
    });

    const result = await response.json();
    console.log({ result });

    if (!response.ok) {
      toast.error(result.error);
      return;
    }

    //console.log(result, ";");

    toast.success("Email verifified Successfuly");

    cookies.set("authToken", result.jwt_token, {
      expires: new Date(twoWeeksFromToday.setDate(today.getDate() + 14)),
    });

    return result;
  } catch (error) {
    console.log(error);
  }
};

//"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNDYxOTk3NzMtZDMzMC00ODU4LWJhN2YtYWE5NzNjNDA4MzkxIiwiZXhwIjoxNzcyNjA2NjY5fQ.nmw2alFJCd4LkFy81iuKFmRCw1-HxDeDmMaBnGBR418"
