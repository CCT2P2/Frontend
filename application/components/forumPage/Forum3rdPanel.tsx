"use client";
import { useState, useEffect } from "react";
import { Card, CardTitle } from "@/components/ui/card";
import { useUISettings } from "@/app/store/useUISettings";
import { Button } from "@/components/ui/button";
import { userJoinCommunity } from "@/lib/actions/userJoinCommunity";
import { GetUserProfileResponse } from "@/lib/apiTypes";
import { useAuthFetch } from "@/lib/hooks/useAuthFetch";

interface ForumNameProps {
	name: string;
	description: string;
	forumId: number;
	userId: string;
}

export function ForumName({
	name,
	description,
	forumId,
	userId,
}: ForumNameProps) {
	const { padding, paddingButton } = useUISettings();
	const {
		data: userData,
		isLoading,
		status,
		error,
	} = useAuthFetch<GetUserProfileResponse>(`/api/user/profile/${userId}`);

	const [joined, setJoined] = useState(false);

	// Update local joined state when userData changes
	useEffect(() => {
		if (userData?.community_ids) {
			setJoined(userData.community_ids.includes(forumId));
		} else {
			setJoined(false);
		}
	}, [userData, forumId]);

	const handleJoin = async () => {
		try {
			const action = joined ? "leave" : "join"; // <-- decide action
			const response = await userJoinCommunity({ userId, forumId, action });

			if (response.success) {
				setJoined(!joined); // flip state
			} else {
				console.error(`Failed to ${action} community:`, response.message);
			}
		} catch (error) {
			console.error("Error joining/leaving community:", error);
		}
	};

	return (
		<div>
			<Card className={`p-${padding}`}>
				<div className="flex flex-row">
					<CardTitle className="">{name}</CardTitle>
					<Button
						variant={joined ? "ghost" : "outline"}
						className={`ml-auto ${joined ? "text-gray-500" : "text-white"} p-2 rounded-md hover:bg-primary/80 transition-colors duration-200`}
						onClick={handleJoin}
					>
						{joined ? "Joined" : "Join"}
					</Button>
				</div>
				<div className={`p-${paddingButton}`}>{description}</div>
			</Card>
		</div>
	);
}
