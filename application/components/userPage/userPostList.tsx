"use client";

import { Card } from "@/components/ui/card";
import PostThumbnail from "@/components/general/postThumbnail";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SortingMenu from "@/components/general/sortingMenu";
import {useAuthFetch} from "@/lib/hooks/useAuthFetch";
import {GetMultiplePostsResponse} from "@/lib/apiTypes";
import LoadingSpinner from "@/components/general/loadingSpinner";
import {useState} from "react";

interface Props {
	userId: number;
	limit?: number;
}

export default function UserPostList({userId, limit}: Props) {
	const [sortingOption, setSortingOption] = useState<string>("new");

	return (
		<Card className={`grow relative light-glow-primary col-span-3`}>
			<Tabs defaultValue="posts" className={`px-10 py-6 gap-4`}>
				<TabsList className={`w-full bg-black/50`}>
					<TabsTrigger value="posts">Posts</TabsTrigger>
					<TabsTrigger value="comments">Comments</TabsTrigger>
					<TabsTrigger value="liked">Liked</TabsTrigger>
					<TabsTrigger value="collections">Collections</TabsTrigger>
				</TabsList>
				<div className="flex items-center justify-between">
					<SortingMenu setCurrentOption={setSortingOption} currentOption={sortingOption}/>
				</div>
				<TabsContent value={"posts"}>
					<NormalPostList userId={userId} limit={limit} sortOption={sortingOption}/>
				</TabsContent>

				<TabsContent value="comments" className="relative">
					{/* Coming soon overlay */}
					<div className="absolute inset-0 bg-black/50 backdrop-blur-md flex flex-col items-center justify-center rounded-xs">
						<span className="text-red-500 font-bold text-2xl text-center">
							COMING SOON
						</span>
						<span className="text-red-400 font-semibold text-xs mt-2 text-center">
							(Lol, no it won't)
						</span>
					</div>
				</TabsContent>
				<TabsContent value="liked" className="relative">
					{/* Coming soon overlay */}
					<div className="absolute inset-0 bg-black/50 backdrop-blur-md flex flex-col items-center justify-center rounded-xs">
						<span className="text-red-500 font-bold text-2xl text-center">
							COMING SOON
						</span>
						<span className="text-red-400 font-semibold text-xs mt-2 text-center">
							(Lol, no it won't)
						</span>
					</div>
				</TabsContent>
				<TabsContent value="collections" className="relative">
					{/* Coming soon overlay */}
					<div className="absolute inset-0 bg-black/50 backdrop-blur-md flex flex-col items-center justify-center rounded-xs">
						<span className="text-red-500 font-bold text-2xl text-center">
							COMING SOON
						</span>
						<span className="text-red-400 font-semibold text-xs mt-2 text-center">
							(Lol, no it won't)
						</span>
					</div>
				</TabsContent>
			</Tabs>
		</Card>
	);
}

function NormalPostList({userId, limit, sortOption}: {userId: number, limit?: number, sortOption: string}) {
	const params = new URLSearchParams();
	if (limit) {
		params.append("Limit", limit.toString())
	}
	params.append("UserId", userId.toString())

	switch (sortOption) {
		case "top":
			params.append("SortBy", "likes");
			break;
		case "worst":
			params.append("SortBy", "likes");
			params.append("SortOrder", "asc");
	}

	const {
		data: postsData,
		isLoading,
		status,
		error
	} = useAuthFetch<GetMultiplePostsResponse>(`/api/post/posts?${params.toString()}`);

	if (isLoading) return <LoadingSpinner absolute={false}/>

	if (error || !postsData) {
		return (
			<div className="p-4 text-center">
				<p className="text-red-500">Failed to load posts :c</p>
				<p className="text-sm text-gray-500">{error}</p>
			</div>
		);
	}

	return (
		<div className={"flex flex-col gap-8"}>
			{postsData.posts.map((post) => (
				<PostThumbnail
					postData={post}
					key={post.post_id}
				/>
			))}
		</div>
	)
}
