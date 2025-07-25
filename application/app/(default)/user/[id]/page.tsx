"use client";

import {use, useEffect, useState} from "react";
import UserInfo from "@/components/userPage/userInfo";
import ForumList from "@/components/forumPage/ForumList";
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
        error,
    } = useAuthFetch<GetUserProfileResponse>(`/api/user/profile/${userId}`);

    if (isLoading) return <LoadingSpinner delay={500}/>;

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
    return (
        <div className={`grid grid-cols-4 gap-12 container mx-auto px-20 my-26`}>
            <div className={"flex flex-col gap-6 max-w-70 justify-self-end sticky top-26 h-fit"}>
                <UserInfo userData={userData}/>
                <ForumList/>
            </div>
            <UserPostList userId={userData.id} limit={50}/>
        </div>
    );
}
