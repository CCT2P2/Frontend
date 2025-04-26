"use client";
import { useState, useEffect } from "react";
import { Card, CardTitle } from "@/components/ui/card";
import { useUISettings } from "@/app/store/useUISettings";
import { Button } from "@/components/ui/button";
import { userJoinCommunity } from "@/lib/actions/userJoinCommunity";
import { GetUserProfileResponse } from "@/lib/apiTypes";
import { useAuthFetch } from "@/lib/hooks/useAuthFetch";

const orange = "#fc6e22";
const blue = "#5382a1";
const yellow = "#ffff66";
const purple = "#c24cf6";
const green = "#78fe8b";

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
			const response = await userJoinCommunity({ userId, forumId });

			// If using fetch-based request
			if (response.success) {
				setJoined(true);
			} else {
				console.error("Failed to join community:", response.message);
			}
		} catch (error) {
			console.error("Error joining community:", error);
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

export function ForumTagsPanel() {
	const { padding, paddingButton } = useUISettings();
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
				{/* Coming soon overlay */}
				<div className="absolute inset-0 bg-black/50 backdrop-blur-md flex flex-col items-center justify-center rounded-xs">
					<span className="text-red-500 font-bold text-2xl text-center">
						COMING SOON
					</span>
					<span className="text-red-400 font-semibold text-xs mt-2 text-center">
						(Lol, no it won't)
					</span>
				</div>
			</Card>
		</div>
	);
}
