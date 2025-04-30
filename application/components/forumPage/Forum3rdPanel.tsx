"use client";
import { useState, useEffect } from "react";
import { Card, CardTitle } from "@/components/ui/card";
import { useUISettings } from "@/app/store/useUISettings";
import { Button } from "@/components/ui/button";
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

	return (
		<div>
			<Card className={`p-${padding} light-glow-secondary`}>
				<div className="flex flex-row">
					<CardTitle className="">{name}</CardTitle>
				</div>
				<div className={`p-${paddingButton}`}>{description}</div>
			</Card>
		</div>
	);
}
