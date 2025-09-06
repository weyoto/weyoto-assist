import { toast } from "sonner";
import { baseUrl } from "../baseUrl";
import { token } from "@/utils/token";

export const deleteBusinessDetail = async (id: string) => {
  try {
    const response = await fetch(`${baseUrl}/business/delete-details/${id}`, {
      method: "DELETE",
      headers: {
        accept: "Application/json",
        "content-type": "Application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const result = await response.json();
    console.log({ result });

    if (!response.ok) {
      toast.error(result.error);
      return;
    }
    toast.success("Business Detail deleted");
    return result;
  } catch {
    toast.error("Something went wrong");
  }
};
