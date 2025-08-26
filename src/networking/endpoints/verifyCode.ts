import { toast } from "sonner";
import { baseUrl } from "../baseUrl";

export const verifyCode = async (email: string, code: string) => {
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

    toast.success(result.message);

    return result;
  } catch (error) {
    console.log(error);
  }
};
