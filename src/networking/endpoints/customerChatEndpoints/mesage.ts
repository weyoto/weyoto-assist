import { baseUrl } from "@/networking/baseUrl";
import { MessagesResponseType } from "@/types/MessagesType";
import { toast } from "sonner";
//import { startThread } from "./startThread";

export const message = async (
  thread_id: string,
  user_id: string,
  message: string
): Promise<MessagesResponseType | undefined> => {
  try {
    //const thread_id = await startThread(business_id);
    const response = await fetch(`${baseUrl}/inquiry/message`, {
      method: "POST",
      headers: {
        Accept: "Application/json",
        "content-type": "Application/json",
      },
      body: JSON.stringify({
        thread_id,
        user_id,
        message,
      }),
    });

    const result = await response.json();
    if (!response.ok) {
      toast("Failed to send message");
      return;
    }

    console.log({ result });

    return result;
  } catch {
    toast.error("Something went wrong");
  }
};
