"use client";
import React, { useState } from "react";
import { CardContent } from "../ui/card";
import { Check, Download, FileText, X } from "lucide-react";
import { useBoundStore } from "@/store/store";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";
import { UploadedFile } from "@/types/BusinessDocsType";
import { useRouter } from "next/navigation";
import { businessDetails } from "@/types/BusinessDetailsType";
import { useQueries, useQueryClient } from "@tanstack/react-query";
import { viewBusinessDetails } from "@/networking/endpoints/ViewBusinessDetails";
import { deleteBusinessDetail } from "@/networking/endpoints/deleteBusinessDetail";
import { editBusinessDetails } from "@/networking/endpoints/editBusinessDetails";
import { viewFiles } from "@/networking/endpoints/viewFiles";

const AddBusinessDetails = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  //const setChatText = useBoundStore((state) => state.setChatText);
  const tempBusinessDocs = useBoundStore((state) => state.tempBusinessDocs);
  const editingDetailId = useBoundStore((state) => state.editingDetailId);
  const editingValue = useBoundStore((state) => state.editingValue);
  const setEditingDetailId = useBoundStore((state) => state.setEditingDetailId);
  const setEditingValue = useBoundStore((state) => state.setEditingValue);
  const [viewingDoc, setViewingDoc] = useState<UploadedFile | null>(null);

  const setTempBusinessDocs = useBoundStore(
    (state) => state.setTempBusinessDocs
  );

  const handleEditDetails = (detail: businessDetails) => {
    setEditingDetailId(detail.id);
    setEditingValue(detail.value);
  };

  const handleSaveEdit = async (detailId: string) => {
    try {
      queryClient.setQueryData(
        ["businessDetails"],
        (oldData: { details: businessDetails[] }) => {
          if (!oldData?.details) return oldData;
          return {
            ...oldData,
            details: oldData.details.map((item) =>
              item.id === detailId ? { ...item, value: editingValue } : item
            ),
          };
        }
      );

      await editBusinessDetails(editingValue, detailId);

      setEditingDetailId(null);
      setEditingValue("");

      queryClient.invalidateQueries({ queryKey: ["businessDetails"] });
    } catch (error) {
      queryClient.invalidateQueries({ queryKey: ["businessDetails"] });
      console.error("Failed to update business detail:", error);
    }
  };

  const handleCancelEdit = () => {
    setEditingDetailId(null);
    setEditingValue("");
  };

  const handleRemoveBusinessDocs = (id: string) => {
    const filteredTempBusinessDocs = tempBusinessDocs.filter(
      (item) => item.id !== id
    );

    setTempBusinessDocs(filteredTempBusinessDocs);
  };
  const handleViewDocument = (doc: UploadedFile) => {
    if (doc.filetype === "pdf" && doc.id) {
      // Open PDF in device's default viewer
      window.open(doc.filetype, "_blank");
    } else if (doc.filetype === "pdf") {
      // For sample PDFs without actual content, show info
      alert(
        "This is a sample PDF. Upload a real PDF to view it in your device's default viewer."
      );
    } else {
      // For Word docs, still show the modal with download option
      setViewingDoc(doc);
    }
  };

  const handleCloseDocumentViewer = () => {
    setViewingDoc(null);
  };

  const handleDownloadDocument = (doc: UploadedFile) => {
    if (doc) {
      const link = document.createElement("a");
      link.href = doc.filename;
      link.download = doc.filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  // const businessDetailsLength = businessDetails ? 1 : 0;

  const goBack = () => {
    router.back();
  };

  const results = useQueries({
    queries: [
      { queryKey: ["businessDetails"], queryFn: viewBusinessDetails },
      { queryKey: ["uploadedFiles"], queryFn: viewFiles },
      // { queryKey: ["todos"], queryFn: fetchTodos },
    ],
  });

  const [businessDetails, uploadedFiles] = results;

  const removeDetails = async (detailId: string) => {
    try {
      queryClient.setQueryData(
        ["businessDetails"],
        (oldData: { details: businessDetails[] }) => {
          console.log({ oldData });
          if (!oldData?.details) return oldData;
          return {
            ...oldData,
            details: oldData?.details.filter((item) => item.id != detailId),
          };
        }
      );

      await deleteBusinessDetail(detailId);

      // Invalidate to ensure we have the latest server state
      queryClient.invalidateQueries({ queryKey: ["businessDetails"] });
    } catch (error) {
      // If the API call fails, revert the optimistic update
      queryClient.invalidateQueries({ queryKey: ["businessDetails"] });
      console.error("Failed to remove business detail:", error);
    }
  };

  const serverFiles: UploadedFile[] = uploadedFiles.data?.[1]?.files || [];
  const totalDocsCount = (tempBusinessDocs?.length || 0) + serverFiles.length;

  return (
    <div className="bg-white gap-[5rem] p-6">
      {/* Welcome Section */}

      <button onClick={goBack} className="flex justify-end w-full ">
        <X className="h-6 w-6 text-black " />
      </button>
      <div className="space-y-2 ">
        <h1 className="text-2xl font-semibold text-gray-900">
          Business details & docs
        </h1>
        <p className="text-gray-600 text-sm leading-relaxed">
          You’ve added {businessDetails.data?.details?.length} business details
          & {serverFiles?.length} docs
        </p>
      </div>

      {/* Stats Section */}
      <div className="flex flex-col gap-[5rem] mt-[0.875rem]">
        <div className="space-y-2">
          <p className="text-gray-900 font-bold">
            Business details{" "}
            <span className="text-gray-500 text-sm">Tap to edit</span>
          </p>

          <CardContent>
            {businessDetails?.data?.details &&
            businessDetails?.data?.details?.length > 0
              ? businessDetails?.data?.details.map((item) => {
                  const isEditing = editingDetailId === item.id;

                  return (
                    <div key={item.id} className="relative ">
                      {isEditing ? (
                        <div className="flex items-center gap-2">
                          <textarea
                            value={editingValue}
                            onChange={(e) => setEditingValue(e.target.value)}
                            className="flex-1 p-3 bg-white rounded-lg border-2 border-blue-500 text-sm text-gray-700 resize-none focus:outline-none focus:border-blue-600"
                            rows={3}
                            autoFocus
                          />
                          <div className="flex flex-col gap-1">
                            <button
                              onClick={() => handleSaveEdit(item.id)}
                              className="p-2 hover:bg-green-100 rounded-full transition-colors"
                              title="Save changes"
                            >
                              <Check className="h-4 w-4 text-green-600" />
                            </button>
                            <button
                              onClick={handleCancelEdit}
                              className="p-2 hover:bg-gray-200 rounded-full transition-colors"
                              title="Cancel editing"
                            >
                              <X className="h-4 w-4 text-gray-500" />
                            </button>
                          </div>
                        </div>
                      ) : (
                        <>
                          <button
                            onClick={() => handleEditDetails(item)}
                            className="w-full text-left p-3 bg-gray-50 rounded-lg border text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                          >
                            {item.value}
                          </button>
                          <button
                            onClick={() => removeDetails(item.id)}
                            className="absolute top-2 right-2 p-1 hover:bg-gray-200 rounded-full"
                          >
                            <X className="h-4 w-4 text-gray-500" />
                          </button>
                        </>
                      )}
                    </div>
                  );
                })
              : ""}
          </CardContent>
        </div>

        {/* Business Details Section */}
        <div>
          <div className="space-y-2">
            <p className="text-gray-900 font-medium">Business docs</p>

            <CardContent className="space-y-3">
              {serverFiles.map((file) => (
                <div
                  key={file.id}
                  className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg bg-green-100"
                >
                  <div
                    onClick={() => handleViewDocument(file)}
                    className="p-2 rounded-lg w-11/12 cursor-pointer"
                  >
                    <FileText className="h-5 w-5 text-green-600" />
                    <span className="text-sm text-gray-700 flex-1">
                      {file.filename}
                    </span>
                    <span className="text-xs text-gray-500 block">
                      Status: {file.status} • Uploaded:{" "}
                      {new Date(file.uploaded_at).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))}

              {tempBusinessDocs.map((doc) => (
                <div
                  key={doc.id}
                  className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg bg-purple-100"
                >
                  <div
                    onClick={() => handleViewDocument(doc)}
                    className="p-2 rounded-lg w-11/12"
                  >
                    <FileText className="h-5 w-5 text-purple-600" />
                    <span className="text-sm text-gray-700 flex-1">
                      {doc.filename}
                    </span>
                    <span className="text-xs text-gray-500 block">
                      Uploading...
                    </span>
                  </div>

                  <X
                    onClick={() => handleRemoveBusinessDocs(doc.id.toString())}
                    className="h-4 w-1/12 text-gray-500 cursor-pointer"
                  />
                </div>
              ))}

              {/*  {totalDocsCount > 2 && (
                <button className="text-sm text-blue-600 hover:text-blue-700">
                  View more
                </button>
              )} */}
            </CardContent>
          </div>
        </div>

        <Dialog
          open={!!viewingDoc}
          onOpenChange={() => handleCloseDocumentViewer()}
        >
          <DialogContent className="max-w-4xl max-h-[80vh]">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                {viewingDoc?.filename}
              </DialogTitle>
            </DialogHeader>
            <div className="flex-1 overflow-auto">
              <div className="w-full h-96 bg-gray-100 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <FileText className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-600">Word Document</p>
                  <p className="text-sm text-gray-500 mt-1">
                    {viewingDoc?.filename}
                  </p>
                  <p className="text-xs text-gray-400 mt-2 mb-4">
                    {viewingDoc?.id
                      ? "Word documents cannot be previewed in browser"
                      : "Sample document"}
                  </p>
                  {viewingDoc?.id && (
                    <Button
                      onClick={() => handleDownloadDocument(viewingDoc)}
                      className="flex items-center gap-2"
                    >
                      <Download className="h-4 w-4" />
                      Download to View
                    </Button>
                  )}
                </div>
              </div>
            </div>
            <div className="flex gap-2 mt-4">
              {viewingDoc?.id && (
                <Button
                  onClick={() => handleDownloadDocument(viewingDoc)}
                  variant="outline"
                  className="flex items-center gap-2"
                >
                  <Download className="h-4 w-4" />
                  Download
                </Button>
              )}
              <Button
                onClick={handleCloseDocumentViewer}
                variant="outline"
                className="flex-1 bg-transparent"
              >
                Close
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      {/* Action Buttons */}
    </div>
  );
};

export default AddBusinessDetails;
