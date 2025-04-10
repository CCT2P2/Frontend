import {Card, CardContent, CardHeader} from "@/components/ui/card";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";

interface UserData {
    email: string;
    username: string;
    img_path: string;
    description: string;
}

export default function UserInfo({email, username, img_path, description}: UserData) {
    return (
        <Card className={"py-8"}>
            <CardHeader className={"flex flex-col gap-2"}>
                <Avatar className={"w-18 h-18"}>
                    <AvatarImage src={img_path} alt={"pfp"}/>
                    <AvatarFallback>What</AvatarFallback>
                </Avatar>
                <div className={"w-full"}>
                    <p className={"font-bold text-xl"}>Zazaa</p>
                    <p className={"text-sm text-muted-foreground"}>{username}</p>
                </div>
            </CardHeader>
            <CardContent>
                <p className={"text-sm"}>{description}</p>
            </CardContent>
        </Card>
    )
}