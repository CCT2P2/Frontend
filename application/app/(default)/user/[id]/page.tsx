import {Suspense} from "react";
import UserInfo from "@/components/userPage/userInfo";
import UserForumList from "@/components/userPage/userForumList";
import UserPostList from "@/components/userPage/userPostList";
import {GetUserProfileResponse} from "@/lib/apiTypes";

interface Props {
    params: {
        id: string;
    }
}

export default function UserPage({params}: Props) {
    return (
        <Suspense fallback={<span className={"absolute inset-[50%] loading loading-spinner loading-lg"}></span>}>
            <UserPageLayout params={params}/>
        </Suspense>
    )
}

async function UserPageLayout({params}: Props) {
    // const userId = params.id;
    // const userData = await getUserProfile(userId);
    //
    // if (!userData.data) {
    //     return <>Evil error happend :c</> // TODO: Make actual error page
    // }

    // test data cus the database does not work atm
    const userData = {
        id: params.id,
        email: "snoy@moder.waow",
        username: "literally_a_cat_" + params.id,
        img_path: "/example_pfp.jpg",
        community_ids: [1, 2], // this one wont matter anyway
        tags: [1, 2], // or this
        post_ids: [1, 2], // not this either
        admin: false,
        description: "Omg description uhmmm, idk what to write here wtf"
    }

    return (
        <div className={"grid grid-cols-4 gap-12 container mx-auto px-6 my-10"}>
            <div className={"col-span-1 flex flex-col gap-12"}>
                <UserInfo username={userData.username} email={userData.email}
                          img_path={userData.img_path} description={userData.description}/>
                <UserForumList/>
            </div>
            <UserPostList/>
        </div>
    )
}