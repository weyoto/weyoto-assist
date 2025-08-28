"use client";
import React, { useState } from "react";
import { CardContent } from "../ui/card";
import { Download, FileText, X } from "lucide-react";
import { useBoundStore } from "@/store/store";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";
import { BusinessDoc } from "@/types/BusinessDocsType";

const AddBusinessDetails = () => {
  const businessDetails = useBoundStore((state) => state.businessDetails);
  const setBusinessDetails = useBoundStore((state) => state.setBusinessDetails);
  const setChatText = useBoundStore((state) => state.setChatText);
  const tempBusinessDocs = useBoundStore((state) => state.tempBusinessDocs);
  const [viewingDoc, setViewingDoc] = useState<BusinessDoc | null>(null);

  const setTempBusinessDocs = useBoundStore(
    (state) => state.setTempBusinessDocs
  );

  const handleEditDetails = () => {
    setChatText(businessDetails);
  };

  const removeDetails = () => {
    setBusinessDetails("");
  };

  const handleRemoveBusinessDocs = (id: string) => {
    const filteredTempBusinessDocs = tempBusinessDocs.filter(
      (item) => item.id !== id
    );

    setTempBusinessDocs(filteredTempBusinessDocs);
  };
  const handleViewDocument = (doc: BusinessDoc) => {
    if (doc.type === "pdf" && doc.url) {
      // Open PDF in device's default viewer
      window.open(doc.url, "_blank");
    } else if (doc.type === "pdf") {
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

  const handleDownloadDocument = (doc: BusinessDoc) => {
    if (doc.url) {
      const link = document.createElement("a");
      link.href = doc.url;
      link.download = doc.name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const businessDetailsLength = businessDetails ? 1 : 0;

  return (
    <div className="bg-white gap-[5rem] p-6 ">
      {/* Welcome Section */}

      <div className="space-y-2 ">
        <h1 className="text-2xl font-semibold text-gray-900">
          Business details & docs
        </h1>
        <p className="text-gray-600 text-sm leading-relaxed">
          You’ve added {businessDetailsLength} business details &{" "}
          {tempBusinessDocs?.length} docs
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
            {businessDetails ? (
              <div className="relative ">
                <button
                  onClick={handleEditDetails}
                  className="w-full text-left p-3 bg-gray-50 rounded-lg border text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  {businessDetails}
                </button>
                <button
                  onClick={removeDetails}
                  className="absolute top-2 right-2 p-1 hover:bg-gray-200 rounded-full"
                >
                  <X className="h-4 w-4 text-gray-500" />
                </button>
              </div>
            ) : (
              ""
            )}
          </CardContent>
        </div>

        {/* Business Details Section */}
        <div>
          <div className="space-y-2">
            <p className="text-gray-900 font-medium">Business docs</p>

            <CardContent className="space-y-3">
              {tempBusinessDocs.map((doc) => (
                <div
                  key={doc.id}
                  className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg bg-purple-100 "
                >
                  <div
                    onClick={() => {
                      handleViewDocument(doc);
                    }}
                    className="p-2 rounded-lg w-11/12"
                  >
                    <FileText className="h-5 w-5 text-purple-600" />{" "}
                    <span className="text-sm text-gray-700 flex-1 ">
                      {doc.name}
                    </span>
                  </div>

                  <X
                    onClick={() => handleRemoveBusinessDocs(doc.id)}
                    className="h-4 w-1/12 text-gray-500"
                  />
                </div>
              ))}
              {tempBusinessDocs?.length > 2 && (
                <button className="text-sm text-blue-600 hover:text-blue-700">
                  View more
                </button>
              )}
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
                {viewingDoc?.name}
              </DialogTitle>
            </DialogHeader>
            <div className="flex-1 overflow-auto">
              <div className="w-full h-96 bg-gray-100 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <FileText className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-600">Word Document</p>
                  <p className="text-sm text-gray-500 mt-1">
                    {viewingDoc?.name}
                  </p>
                  <p className="text-xs text-gray-400 mt-2 mb-4">
                    {viewingDoc?.url
                      ? "Word documents cannot be previewed in browser"
                      : "Sample document"}
                  </p>
                  {viewingDoc?.url && (
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
              {viewingDoc?.url && (
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
