import React from "react";

import UploadBtn from "@/components/UploadBtn";

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

import Link from "next/link";

export default async function page() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  console.log(user?.user_metadata.email, process.env.ADMIN_MAIL);

  if (!user || user?.user_metadata.email !== process.env.ADMIN_MAIL) {
    return redirect("/login");
  }

  return (
    <div className="w-[100vw] h-vh px-2 py-4">
      <div>
        <div className="flex gap-2 bg-stone-900 rounded p-2 mb-4">
          <Link
            className=" text-stone-400 hover:text-stone-50 transition-colors"
            href="/admin"
          >
            Payload Admin
          </Link>
          <Link
            className=" text-stone-400 hover:text-stone-50 transition-colors"
            href="/"
          >
            Homepage
          </Link>
          <Link
            className=" text-stone-400 hover:text-stone-50 transition-colors"
            href="/release-notes"
          >
            Release Notes
          </Link>
        </div>

        <h1 className=" text-4xl font-bold ">Upload</h1>
        <p className="text-xs text-stone-500">Upload your files here</p>

        <div className=" ">
          <UploadBtn />
        </div>
      </div>
    </div>
  );
}
