import {GetUserProfileResponse} from "@/lib/apiTypes";

export async function getUserProfile(userId: string): Promise<{
    responseCode: number,
    data?: GetUserProfileResponse;
}> {
    console.log("userId: ", userId);
    const response = await fetch(`http://localhost:5000/api/user/profile/${userId}`);

    if (!response.ok) {
        return {
            responseCode: response.status,
        }
    }

    const responseData: GetUserProfileResponse = await response.json();
    return {
        responseCode: response.status,
        data: responseData,
    };
}