"use client";

import {use, useEffect, useState} from "react";
import UserInfo from "@/components/userPage/userInfo";
import UserForumList from "@/components/userPage/userForumList";
import UserPostList from "@/components/userPage/userPostList";
import {useUISettings} from "@/app/store/useUISettings";
import {GetUserProfileResponse} from "@/lib/apiTypes";
import {notFound, unauthorized} from "next/navigation";
import {useAuthFetch} from "@/lib/hooks/useAuthFetch";
import LoadingSpinner from "@/components/general/loadingSpinner";

interface Props {
    params: Promise<{ id: string }>;
}

export default function UserPage({params}: Props) {
    const userId = use(params).id;

    const {
        data: userData,
        isLoading,
        status,
        error
    } = useAuthFetch<GetUserProfileResponse>(`/api/user/profile/${userId}`);

    if (status === 404) return notFound();

    if (isLoading) return <LoadingSpinner/>;

    if (error || !userData) {
        return (
            <div className="p-4 text-center">
                <p className="text-red-500">Failed to load user profile</p>
                <p className="text-sm text-gray-500">{error}</p>
            </div>
        );
    }

    return <UserPageLayout userData={userData}/>;
}

function UserPageLayout({userData}: { userData: GetUserProfileResponse }) {
    const {blur} = useUISettings();

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
            <UserPostList backgroundColor={blur ? "bg-stone-800/20" : "bg-black"}/>
        </div>
    );
}
