export interface UploadedFile {
  embedded_at: string | null;
  filename: string;
  filetype: "pdf" | "docx" | string; // Extend if needed
  id: number | string;
  num_chunks: number | null;
  parsed_at: string | null;
  status: "embedded" | "error" | string;
  uploaded_at: string;
}

export type UploadedFileResponse = [
  { count: number },
  { files: UploadedFile[] }
];
