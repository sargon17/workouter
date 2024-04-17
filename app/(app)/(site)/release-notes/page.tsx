import React from "react";
import Header from "@/components/Header";
import Body from "@/components/Body";

import configPromise from "@payload-config";
import { getPayload } from "payload";
import Image from "next/image";

export default async function page() {
  const payload = await getPayload({
    config: configPromise,
  });

  let data = await payload.find({
    collection: "release-notes",
  });

  // order by version
  data.docs.sort((a: any, b: any) => {
    return a.version - b.version;
  });

  return (
    <>
      <Body>
        <div className=" max-w-screen-2xl mx-auto">
          <div className="">
            <div className="flex flex-col gap-48">
              {data.docs.map((releaseNote: any) => (
                <article key={releaseNote._id}>
                  <h1 className="text-4xl font-bold text-stone-200 md:w-[80%] lg:w-[60%]">
                    {releaseNote.title}
                  </h1>
                  {releaseNote.coverImage && (
                    <Image
                      src={releaseNote.coverImage}
                      alt={releaseNote.title}
                      className="w-full !h-96 object-cover rounded-xl mt-4"
                      layout="responsive"
                      width={2200}
                      height={400}
                      quality={70}
                    />
                  )}
                  <div
                    dangerouslySetInnerHTML={{ __html: releaseNote.content_html }}
                    className="rich-text"
                  />
                </article>
              ))}
            </div>
          </div>
        </div>
      </Body>
    </>
  );
}
