import { token } from "@/utils/token";
import { baseUrl } from "../baseUrl";
import { toast } from "sonner";

export const businessInquiry = async (message: string) => {
  try {
    const response = await fetch(`${baseUrl}/inquiry/ask`, {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ message }),
    });

    const result = await response.json();

    if (!response.ok) return;

    console.log({ result });

    return result;
  } catch {
    toast.error("An error Occured");
  }
};
