import { toast } from "sonner";
import { baseUrl } from "../baseUrl";
import { token } from "@/utils/token";

export const uploadFile = async (file: File) => {
  console.log({ file, token });
  try {
    const formData = new FormData();

    // Append the file
    formData.append("file", file);

    console.log({ formData });

    const response = await fetch(`${baseUrl}/files/upload`, {
      method: "POST",

      headers: {
        // "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    const result = await response.json();
    console.log({ result });
    if (!response.ok) {
      toast("An error occured");
      return false;
    }

    toast("File uploaded Successfully");

    return result;
  } catch (error) {
    console.log(error);
  }
};
