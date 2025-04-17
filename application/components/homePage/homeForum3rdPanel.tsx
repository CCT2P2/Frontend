import {Card, CardTitle} from "@/components/ui/card";
import {useUISettings} from "@/app/store/useUISettings";
import {useCurrentSession} from "@/lib/hooks/useCurrentSession";

const orange = "#fc6e22";
const blue = "#5382a1";
const yellow = "#ffff66";
const purple = "#c24cf6";
const green = "#78fe8b";

export function HomeForumName() {
    const {padding, paddingButton} = useUISettings();
    const { session, status } = useCurrentSession();

    console.log(session)
    console.log(status)

    // Show loading state while session is being fetched
    // if (status === "loading") {
    //     return <div>Loading session...</div>;
    // }

    return (
        <div>
            <Card className={`p-${padding}`}>
                <CardTitle className={``}>Home</CardTitle>
                <div className={`p-${paddingButton}`}>
                    <p>Your personal place to chill with familiar posts, or discover brand new content</p>
                </div>
                <div>
                    <p className={"text-xl"}>Auth testing:</p>
                    <p>You are logged in as:</p>
                    {status === "loading"
                        ? <div>Loading session...</div>
                        : <p className={"text-primary"}>{session?.user.username ?? "...nobody"}</p>
                    }

                </div>
            </Card>
        </div>
    );
}

export function HomeForumTagsPanel() {
    const {padding, paddingButton} = useUISettings();
    return (
        <div>
            <Card className={`my-5 p-${padding}`}>
                <CardTitle className={``}>Tags</CardTitle>
                <div className={`p-${paddingButton}`}>
                    Only wanna see content from a specific tag?
                </div>
                <div className={`flex flex-wrap gap-3 `}>
                    <Card
                        className={`border-[${orange}] w-[40%] p-${paddingButton} hover:bg-primary/20 transition-colors duration-200}`}
                    >
                        Rust
                    </Card>
                    <Card
                        className={`border-[${blue}] p-${paddingButton} w-[70%] hover:bg-primary/20 transition-colors duration-200`}
                    >
                        Python
                    </Card>
                    <Card
                        className={`border-[${yellow}] p-${paddingButton} w-[60%] hover:bg-primary/20 transition-colors duration-200`}
                    >
                        JavaScript
                    </Card>
                    <Card
                        className={`border-[${purple}] p-${paddingButton} w-[30%] hover:bg-primary/20 transition-colors duration-200`}
                    >
                        C#
                    </Card>
                    <Card
                        className={`border-[${green}] p-${paddingButton} w-[40%] hover:bg-primary/20 transition-colors duration-200`}
                    >
                        Nim
                    </Card>
                </div>
            </Card>
        </div>
    );
}
