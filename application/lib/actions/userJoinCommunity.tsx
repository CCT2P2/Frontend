import { getSession } from "next-auth/react";

interface userJoinCommunity {
	forumId: number;
	userId: string;
	action: "join" | "leave"; // <-- add action type
}

export async function userJoinCommunity({
	userId,
	forumId,
	action,
}: userJoinCommunity) {
	const session = await getSession();

	if (!session?.user) {
		return { success: false, message: "Invalid user session" };
	}

	const requestBody = {
		Id: parseInt(userId),
		CommunityIds: forumId.toString(),
		Action: action, // <-- include the action
	};

	const response = await fetch(`/api/user/update/backend`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${session?.accessToken}`,
		},
		body: JSON.stringify(requestBody),
	});

	if (!response.ok) {
		return {
			success: false,
			message: `Failed to ${action} user: ${response.status}`,
		};
	}

	return { success: true, message: `User ${action}ed successfully.` };
}
