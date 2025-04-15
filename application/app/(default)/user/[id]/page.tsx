"use client";

import { use, useEffect, useState } from "react";
import UserInfo from "@/components/userPage/userInfo";
import UserForumList from "@/components/userPage/userForumList";
import UserPostList from "@/components/userPage/userPostList";
// import {GetUserProfileResponse} from "@/lib/apiTypes";
import { useUISettings } from "@/app/store/useUISettings";
import { getUserProfile } from "@/lib/data/getUserProfile";
import { GetUserProfileResponse } from "@/lib/apiTypes";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ id: string }>;
}

export default function UserPage({ params }: Props) {
  const userId = use(params).id;
  const [userData, setUserData] = useState<
    | {
        responseCode: number;
        data?: GetUserProfileResponse;
      }
    | undefined
  >(undefined);

  useEffect(() => {
    async function fetchUserData() {
      const data = await getUserProfile(userId);
      setUserData(data);
    }

    fetchUserData();
  }, [userId]);

  if (userData?.responseCode === 404) return notFound();

  if (!userData?.data)
    return (
      <span
        className={"absolute inset-[50%] loading loading-spinner loading-lg"}
      ></span>
    );

  return <UserPageLayout userData={userData.data} />;
}

function UserPageLayout({ userData }: { userData: GetUserProfileResponse }) {
  const { blur } = useUISettings();

  if (!userData) {
    return <>Evil error happend :c</>; // TODO: Make actual error page
  }

  return (
    <div className={`grid grid-cols-4 gap-12 container mx-auto px-6 my-10`}>
      <div className={"col-span-1 flex flex-col gap-12"}>
        <UserInfo
          username={userData.username}
          email={userData.email}
          img_path={userData.img_path}
          description={userData.description}
          backgroundColor={blur ? "bg-stone-800/20" : "bg-black"}
          displayName={userData.display_name}
        />
        <UserForumList
          backgroundColor={blur ? "bg-stone-800/20" : "bg-black"}
        />
      </div>
      <UserPostList backgroundColor={blur ? "bg-stone-800/20" : "bg-black"} />
    </div>
  );
}
