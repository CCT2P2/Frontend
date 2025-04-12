"use client";

import {Suspense, use, useEffect, useState} from "react";
import UserInfo from "@/components/userPage/userInfo";
import UserForumList from "@/components/userPage/userForumList";
import UserPostList from "@/components/userPage/userPostList";
// import {GetUserProfileResponse} from "@/lib/apiTypes";
import {useUISettings} from "@/app/store/useUISettings";
import {getUserProfile} from "@/lib/data/getUserProfile";
import {GetUserProfileResponse} from "@/lib/apiTypes";

interface Props {
    params: Promise<{ id: string }>
}

export default function UserPage({params}: Props) {
    const userId = use(params).id
    const [userData, setUserData] = useState<GetUserProfileResponse | undefined>(undefined)

    useEffect(() => {
        async function fetchUserData() {
            const data = await getUserProfile(userId);
            setUserData(data.data)
        }

        fetchUserData()
    }, [userId])

    if (!userData) return <span className={"absolute inset-[50%] loading loading-spinner loading-lg"}></span>;

    return (
        <UserPageLayout userData={userData}/>
    );
}

function UserPageLayout({userData}: { userData: GetUserProfileResponse }) {
    const {blur} = useUISettings();

    if (!userData) {
        return <>Evil error happend :c</> // TODO: Make actual error page
    }

    // test data cus the database does not work atm

    // const userData = {
    //   id: userId,
    //   email: "snoy@moder.waow",
    //   username: "literally_a_cat_" + userId,
    //   img_path: "/example_pfp.jpg",
    //   community_ids: [1, 2], // this one wont matter anyway
    //   tags: [1, 2], // or this
    //   post_ids: [1, 2], // not this either
    //   admin: false,
    //   description: "Omg description uhmmm, idk what to write here wtf",
    // };


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
