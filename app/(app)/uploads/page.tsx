import React from "react";

import UploadBtn from "@/components/UploadBtn";

export default function page() {
  return (
    <div className="w-full h-vh flex justify-center items-center">
      <div>
        <h1>Upload</h1>
        <p>Upload your files here</p>
        <UploadBtn />
      </div>
    </div>
  );
}
