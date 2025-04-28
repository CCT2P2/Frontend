"use client";

import {Card, CardContent, CardHeader} from "@/components/ui/card";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {GetUserProfileResponse} from "@/lib/apiTypes";


export default function UserInfo({userData}: { userData: GetUserProfileResponse }) {
    return (
        <Card
            className={`py-8 light-glow-primary`}
        >
            <CardHeader className={"flex flex-col gap-2"}>
                <Avatar className={"w-18 h-18"}>
                    <AvatarImage src={userData.img_path} alt={"pfp"}/>
                    <AvatarFallback>{userData.username.slice(0, 1)}</AvatarFallback>
                </Avatar>
                <div className={"w-full"}>
                    <p className={"font-bold text-xl"}>
                        {userData.display_name ? userData.display_name : userData.username}
                    </p>
                    <p className={"text-sm text-muted-foreground"}>{userData.username}</p>
                </div>
            </CardHeader>
            <CardContent>
                {userData.description && <p className={"text-sm"}>{userData.description}</p>}
            </CardContent>
        </Card>
    );
}
