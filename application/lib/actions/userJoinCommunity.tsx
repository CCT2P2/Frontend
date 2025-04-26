import { getSession } from "next-auth/react";

interface userJoinCommunity {
	forumId: number;
	userId: number;
}

export async function userJoinCommunity({
	userId,
	forumId,
}: userJoinCommunity) {
	const session = await getSession();

	if (!session?.user) {
		return { success: false, message: "Invalid user session" };
	}
	console.log(forumId);

	const response = await fetch(`/api/user/update/backend/${userId}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${session?.accessToken}`,
		},
		body: JSON.stringify(forumId.toString()),
	});

	if (!response.ok) {
		return {
			success: false,
			message: `Failed to join user: ${response.status}`,
		};
	}

	return { success: true, message: "User joined successfully." };
}
