import { toast } from "sonner";
import { baseUrl } from "../baseUrl";
import { token } from "@/utils/token";

export const editBusinessDetails = async (
  value: string,
  id: string,
  label?: string
) => {
  try {
    const response = await fetch(`${baseUrl}/business/update-details/${id}`, {
      method: "PATCH",

      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },

      body: JSON.stringify({ value, label }),
    });
    const result = await response.json();
    console.log({ result });
    if (!response.ok) {
      toast("An error occured");
      return false;
    }

    toast("Business Details edited");

    return result;
  } catch (error) {
    console.log(error);
  }
};
