export interface BusinessDoc {
  id: string;
  name: string;
  type: "pdf" | "docx" | "doc";
  file?: File;
  url?: string;
}
