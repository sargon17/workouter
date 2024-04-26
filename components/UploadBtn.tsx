"use client";
import { useState } from "react";

import { UploadButton } from "@/utils/uploadthing";

import { Button } from "./ui/button";
import { toast } from "sonner";

export default function UploadBtn() {
  const [uploadedLinks, setUploadedLinks] = useState<string[]>([]);

  return (
    <main className="">
      <div className="flex w-full justify-center items-center h-[300px] border border-blue-500 rounded-xl my-8 ">
        <UploadButton
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
          endpoint="imageUploader"
          onClientUploadComplete={(res) => {
            // Do something with the response

            toast.success("Upload Completed");

            setUploadedLinks([...uploadedLinks, res[0].url]);
            //   alert("Upload Completed");
          }}
          onUploadError={(error: Error) => {
            // Do something with the error.
            toast.error("Upload Failed");
          }}
        />
      </div>

      <div className="flex flex-col">
        <h1>Uploaded Links</h1>
        <div className="grid grid-cols-4">
          {uploadedLinks.map((link) => (
            <div key={link}>
              <a
                href={link}
                target="_blank"
                rel="noreferrer"
              >
                <img
                  src={link}
                  alt=""
                  className=" rounded-md"
                />
              </a>
              <Button
                onClick={() => {
                  // copy to clipboard
                  navigator.clipboard.writeText(link);

                  toast.success("Link Copied");
                }}
              >
                Copy Link
              </Button>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
