"use client";

import { Upload, X } from "lucide-react";
import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  FileUpload,
  FileUploadDropzone,
  FileUploadItem,
  FileUploadItemDelete,
  FileUploadItemPreview,
  FileUploadList,
  FileUploadTrigger,
} from "@/components/ui/file-upload";

export const title = "Horizontal File List";

const UploadImages = ({ setImages, images, maxFile }: {setImages: React.Dispatch<React.SetStateAction<File[]>>; images: File[], maxFile?: number}) => {

  return (
    <FileUpload
      maxFiles={maxFile || 8}
      maxSize={5 * 1024 * 1024}
      className="w-full mt-5"
      value={images}
      onValueChange={setImages}
      multiple
    >
      <FileUploadDropzone className="py-4 w-full">
        <div className="flex items-center gap-3">
          <Upload className="size-5 text-muted-foreground" />
          <div className="text-left">
            <p className="text-sm font-medium">Drop files or click to browse</p>
            <p className="text-xs text-muted-foreground">Up to 8 files</p>
          </div>
          <FileUploadTrigger asChild>
            <Button variant="outline" size="sm" className="ml-auto">
              Browse
            </Button>
          </FileUploadTrigger>
        </div>
      </FileUploadDropzone>
      <FileUploadList orientation="horizontal" className="gap-3 pb-2">
        {images.map((file, index) => (
          <FileUploadItem
            key={index}
            value={file}
            className="relative shrink-0 p-1"
          >
            <FileUploadItemPreview className="size-16 rounded-md" />
            <FileUploadItemDelete asChild>
              <Button
                variant="secondary"
                size="icon"
                className="absolute -top-2 -right-2 size-5 rounded-full"
              >
                <X className="size-3" />
              </Button>
            </FileUploadItemDelete>
          </FileUploadItem>
        ))}
      </FileUploadList>
    </FileUpload>
  );
};

export default UploadImages;
