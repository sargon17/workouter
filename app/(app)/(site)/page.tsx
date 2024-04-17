import { createClient } from "@/utils/supabase/server";

import Header from "@/components/Header";
import Body from "@/components/Body";

import HomeHero from "@/components/home/HomeHero";
import HomeFeatures from "@/components/home/HomeFeatures";

import { Button } from "@/components/ui/button";
import Link from "next/link";

import configPromise from "@payload-config";
import { getPayload } from "payload";

interface singleLayout {
  id: string;
  blockType: string;
  // other properties are unknown
  [key: string]: any;
}
interface Content {
  id: number;
  title: string;
  slug: string;
  layout?: singleLayout[];
}

export default async function Index() {
  const payload = await getPayload({
    config: configPromise,
  });

  let data = await payload.find({
    collection: "pages",
  });

  const content: Content | any = data.docs.filter((doc) => doc.slug === "home")[0];

  return (
    <div className="w-full flex flex-col gap-20 items-center overflow-hidden">
      <Body>
        {content.layout?.map((block: singleLayout) => {
          switch (block.blockType) {
            case "Hero":
              return (
                <HomeHero
                  key={block.id}
                  content={block as any}
                />
              );
            case "features":
              return <HomeFeatures key={block.id} />;
            default:
              return null;
          }
        })}
        <HomeFeatures />
      </Body>
    </div>
  );
}

const HeaderActionButton = async () => {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return <Button>{user ? <Link href={"/workouts"}>Start</Link> : <Link href={"/login"}>Login</Link>}</Button>;
};
