import { getSession } from "next-auth/react";


interface UpdateCommunityBackendRequest {
    id: number;
    memberCount?: number;
    tags?: string;
    postID?: number;
}

export async function updateCommunityBackend(data: UpdateCommunityBackendRequest){
    const session = await getSession();

    if (!session?.user) {
        return { success: false, message: "Invalid user session" };
    }


    const response = await fetch('/api/community/update/backend', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${session?.accessToken}`
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        return { success: false, message: `Failed to update community: ${response.status}` };
    }

    return { success: true, message: "Community updated successfully." };
}
