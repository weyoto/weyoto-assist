// types/businessProfile.ts
export interface Business {
  description: string;
  details: []; // Replace `any` with correct type if you know what's inside
  handle: string | null;
  name: string;
  public_link: string | null;
}

export interface BusinessProfileResponse {
  business: Business;
  success: boolean;
  message?: string; // Sometimes your API includes a message
  error?: string; // Optional error if request fails
}
