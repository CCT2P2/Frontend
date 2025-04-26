"use client";

import { use, useState, useEffect } from "react";
import ForumList from "@/components/forumPage/ForumList";
import {
	ForumName,
	ForumTagsPanel,
} from "@/components/forumPage/Forum3rdPanel";
import { useUISettings } from "@/app/store/useUISettings";
import PostList from "@/components/forumPage/PostList";
import { useAuthFetch } from "@/lib/hooks/useAuthFetch";
import { GetCommunityResponse, GetUserProfileResponse } from "@/lib/apiTypes";
import LoadingSpinner from "@/components/general/loadingSpinner";
import { useCurrentSession } from "@/lib/hooks/useCurrentSession";

interface Props {
	params: Promise<{ id: string }>;
}

interface Community {
	names: string;
	communityID: number;
	description: string;
}

export default function Home({ params }: Props) {
	const forumId = use(params).id;

	const { padding } = useUISettings();
	const {
		data: forum,
		isLoading,
		error,
	} = useAuthFetch<GetCommunityResponse>(`/api/community/details/${forumId}`);

	const [showSpinner, setShowSpinner] = useState(false);
	const { status, session } = useCurrentSession();

	useEffect(() => {
		let timeout: NodeJS.Timeout;
		if (isLoading) {
			timeout = setTimeout(() => {
				setShowSpinner(true);
			}, 1000);
		}
		return () => clearTimeout(timeout);
	}, [isLoading]);

	if (isLoading && showSpinner) return <LoadingSpinner />;
	if (isLoading) return null;

	if (error || !forum) {
		return (
			<div className="p-4 text-center">
				<p className="text-red-500">Failed to load user profile</p>
				<p className="text-sm text-gray-500">{error}</p>
			</div>
		);
	}

	console.log("FORUM", forum);

	return (
		<div className={`ml-auto px-${padding} py-${padding} w-full`}>
			<div className="flex justify-center gap-6">
				{/* Sidebar */}
				<div className="shrink-0 sticky top-20 h-full max-w-80 w-[15%]">
					<ForumName
						name={forum.name}
						description={forum.description}
						forumId={Number(forumId)}
						userId={session?.user?.id || "0"}
					/>
					<div className="py-8">
						<ForumList />
					</div>
				</div>

				{/* Main Content */}
				<div className="shrink-1 max-w-350 w-[60%] mt-5">
					{forumId === "0" ? (
						<PostList postCsv="latest" />
					) : (
						<PostList postCsv={forum?.post_ids.toString() || ""} />
					)}
				</div>
			</div>
		</div>
	);
}
