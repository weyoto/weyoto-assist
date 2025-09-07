import { baseUrl } from "@/networking/baseUrl";
//import { token } from "@/utils/token";
import { toast } from "sonner";

export const startThread = async (
  business_id: string
): Promise<{ thread_id: string } | undefined> => {
  try {
    console.log({ business_id });
    const response = await fetch(`${baseUrl}/inquiry/start-thread`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${token}`,
        Accept: "Application/json",
      },
      body: JSON.stringify({
        business_id,
      }),
    });
    const result = await response.json();

    console.log({ result });
    if (!response.ok) return;

    return result;
  } catch {
    toast.error("Something went wrong");
  }
};
