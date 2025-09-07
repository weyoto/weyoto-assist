/* import { UploadedFile } from "@/types/BusinessDocsType";

export const uploadDocs = () => {
  let uploadedDoc: UploadedFile | null = null;
  const input = document.createElement("input");
  input.type = "file";
  input.multiple = true;
  input.accept = ".pdf,.doc,.docx";
  input.onchange = (e) => {
    const files = (e.target as HTMLInputElement).files;
    if (files) {
      Array.from(files).forEach((file, index) => {
        const url = URL.createObjectURL(file);
        const newDoc: UploadedFile = {
          id: Date.now().toString() + index,
          name: file.name,
          type: file.name.endsWith(".pdf") ? "pdf" : "docx",
          file: file,
          url: url,
        };

        uploadedDoc = newDoc;
        // setTempBusinessDocs([...tempBusinessDocs, newDoc]);
      });
    }
  };

  input.click();
  return uploadedDoc;
};
 */
