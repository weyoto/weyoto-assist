import { toast } from "sonner";
import { baseUrl } from "../baseUrl";
import { token } from "@/utils/token";

export const addBusinessDetails = async (value: string) => {
  try {
    const response = await fetch(`${baseUrl}/business/add-details`, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },

      body: JSON.stringify({ value }),
    });
    const result = await response.json();
    console.log({ result });
    if (!response.ok) {
      toast("An error occured");
      return false;
    }

    toast("Business Detail added");

    return result;
  } catch (error) {
    console.log(error);
  }
};
