import { toast } from "sonner";
import { baseUrl } from "../baseUrl";

export const requestCode = async (email: string) => {
  try {
    const response = await fetch(`${baseUrl}/auth/request-code`, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({ email }),
    });

    if (!response.ok) {
      toast("An error occured");
      return false;
    }

    toast("Code has been sent to " + email);
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
  }
};
