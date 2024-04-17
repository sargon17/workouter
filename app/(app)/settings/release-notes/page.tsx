import React from "react";
import Header from "../../../../components/Header";
import Body from "../../../../components/Body";

import configPromise from "@payload-config";
import { getPayload } from "payload";

export default async function page() {
  const payload = await getPayload({
    config: configPromise,
  });

  const data = await payload.find({
    collection: "release-notes",
  });

  console.log(data);

  return (
    <>
      <Header
        title="Release Notes"
        backText="Settings"
        backHref="/settings"
      />
      <Body>
        <div className=" max-w-screen-xl mx-auto">
          <h1>Release Notes</h1>
          <div>
            {data.docs.map((releaseNote: any) => (
              <div key={releaseNote._id}>
                <h2>{releaseNote.title}</h2>
                <h3>{releaseNote.version}</h3>
                <div
                  dangerouslySetInnerHTML={{ __html: releaseNote.content_html }}
                  className="rich-text"
                />
              </div>
            ))}
          </div>
        </div>
      </Body>
    </>
  );
}
