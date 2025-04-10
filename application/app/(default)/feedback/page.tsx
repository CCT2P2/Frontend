import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Textarea} from "@/components/ui/textarea";

export default function FeedbackPage() {
    return (
        <div className={"font-inter flex flex-col items-center justify-center h-[calc(100vh-4rem)]"}>
            <Card className={"w-[32rem] py-10"}>
                <CardHeader>
                    <CardTitle>Feedback Page</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className={"relative"}>
                        <Textarea placeholder={"Write your feedback..."}
                                  className={"relative z-20 peer h-96 peer rounded-2xl w-full outline-none focus:border-primary"}/>
                        <div
                            className={"peer-[:focus]:bg-primary/50 bg-primary/10 absolute inset-[0%] z-10 blur-[8px]" +
                                " rounded-xl transition duration-500 ease-out"}></div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}