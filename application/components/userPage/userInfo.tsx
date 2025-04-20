"use client";

import {Card, CardContent, CardHeader} from "@/components/ui/card";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";

interface UserData {
    email: string;
    username: string;
    img_path?: string;
    description?: string;
    displayName?: string;
}

export default function UserInfo({
                                     //email,
                                     username,
                                     img_path,
                                     description,
                                     displayName,
                                 }: UserData) {
    return (
        <Card
            className={`py-8 light-glow-primary`}
        >
            <CardHeader className={"flex flex-col gap-2"}>
                <Avatar className={"w-18 h-18"}>
                    <AvatarImage src={img_path} alt={"pfp"}/>
                    <AvatarFallback>What</AvatarFallback>
                </Avatar>
                <div className={"w-full"}>
                    <p className={"font-bold text-xl"}>
                        {displayName ? displayName : username}
                    </p>
                    <p className={"text-sm text-muted-foreground"}>{username}</p>
                </div>
            </CardHeader>
            <CardContent>
                {description && <p className={"text-sm"}>{description}</p>}
            </CardContent>
        </Card>
    );
}
