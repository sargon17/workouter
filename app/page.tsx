import { createClient } from "@/utils/supabase/server";

import Header from "@/components/Header";
import Body from "@/components/Body";

import HomeHero from "@/components/home/HomeHero";
import HomeFeatures from "@/components/home/HomeFeatures";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function Index() {
  return (
    <div className="w-full flex flex-col gap-20 items-center overflow-hidden">
      <Header
        title="workouter"
        actionBtn={<HeaderActionButton />}
      />
      <Body>
        <HomeHero />
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
