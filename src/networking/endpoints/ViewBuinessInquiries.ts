import { toast } from "sonner";
import { baseUrl } from "../baseUrl";
import { ViewBusinessInquiriesReponse } from "@/types/ViewBusinessInquiriesResult";

export const viewBusinessInquiries = async (): Promise<
  ViewBusinessInquiriesReponse | undefined
> => {
  try {
    const response = await fetch(`${baseUrl}/business/view-inquiries`, {
      method: "GET",
      headers: {
        accept: "Application/json",
        "content-type": "Application/json",
        Authorization: `Bearer ${"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNDYxOTk3NzMtZDMzMC00ODU4LWJhN2YtYWE5NzNjNDA4MzkxIiwiZXhwIjoxNzcyNjA2NjY5fQ.nmw2alFJCd4LkFy81iuKFmRCw1-HxDeDmMaBnGBR418"}`,
      },
    });

    const result = await response.json();
    console.log({ result });

    if (!response.ok) {
      toast.error(result.error);
      return;
    }

    // toast.success(result.message);
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
