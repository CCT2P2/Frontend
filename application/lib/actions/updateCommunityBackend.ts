import { getSession } from "next-auth/react";


interface UpdateCommunityBackendRequest {
    Id: number;
    MemberCount?: number;
    Tags?: string;
    PostID?: string;
}

export async function updateCommunityBackend(data: UpdateCommunityBackendRequest){
    const session = await getSession();

    if (!session?.user) {
        return { success: false, message: "Invalid user session" };
    }
    console.log(data.Id);

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
