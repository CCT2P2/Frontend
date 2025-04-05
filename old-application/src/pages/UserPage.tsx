import {useParams} from "react-router";
import {getUserProfile} from "@/lib/data/getUserProfile.ts";

export default async function UserPage () {
    const params = useParams()
    const userId = params.userId;

    if (userId === undefined) {
        return <>No userId found, this isnt supposed to be possible</>; // TODO: Make an actual error page
    }

    console.log("starting")
    const userData = await getUserProfile(userId);
    console.log(userData)

    if (!userData.data) {
        return <>Evil error happend :c</> // TODO: Make actual error page
    }

    return (
        <div>
            {userData.data.username}
        </div>
    )
}