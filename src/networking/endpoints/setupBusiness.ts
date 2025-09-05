import { toast } from "sonner";
import { baseUrl } from "../baseUrl";
//import Cookies from "universal-cookie";

export const setupBusiness = async (name: string, description: string) => {
  try {
    const response = await fetch(`${baseUrl}/business/setup`, {
      method: "POST",
      headers: {
        accept: "Application/json",
        "content-type": "Application/json",
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNDYxOTk3NzMtZDMzMC00ODU4LWJhN2YtYWE5NzNjNDA4MzkxIiwiZXhwIjoxNzcyNjA2NjY5fQ.nmw2alFJCd4LkFy81iuKFmRCw1-HxDeDmMaBnGBR418`,
      },

      body: JSON.stringify({
        name,
        description,
      }),
    });

    const result = await response.json();
    console.log({ result });

    if (!response.ok) {
      toast.error(result.error);
      return;
    }

    toast.success("Business setup complete");
    /* 
    cookies.set(result, true, {
      expires: new Date(twoWeeksFromToday.setDate(today.getDate() + 14)),
    }); */

    return result;
  } catch (error) {
    console.log(error);
  }
};

//"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNDYxOTk3NzMtZDMzMC00ODU4LWJhN2YtYWE5NzNjNDA4MzkxIiwiZXhwIjoxNzcyNjA2NjY5fQ.nmw2alFJCd4LkFy81iuKFmRCw1-HxDeDmMaBnGBR418"
