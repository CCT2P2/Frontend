import {GetUserProfileResponse} from "@/lib/apiTypes";

export async function getUserProfile(userId: string): Promise<{
    responseCode: number,
    data?: GetUserProfileResponse;
}> {
    const response = await fetch(`/api/user/profile/${userId}`);

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