//TODO: Not in use anymore, remove later

import {GetUserProfileResponse} from "@/lib/apiTypes";

export async function getUserProfile(userId: string, accessToken: string): Promise<{
    responseCode: number,
    data?: GetUserProfileResponse;
}> {
    const response = await fetch(`/api/user/profile/${userId}`, {
        headers: {
            "Authorization": `Bearer ${accessToken}`
        }
    });

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