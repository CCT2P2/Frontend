"use client";
import {Card, CardTitle} from "@/components/ui/card";
import {useUISettings} from "@/app/store/useUISettings";
import {useAuthFetch} from "@/lib/hooks/useAuthFetch";
import {GetAllCommunitiesResponse} from "@/lib/apiTypes";
import {useEffect, useState} from "react";
import LoadingSpinner from "@/components/general/loadingSpinner";
import Link from "next/link";
import {Button} from "@/components/ui/button";
import {Avatar, AvatarFallback} from "@/components/ui/avatar";

export default function ForumList() {
    const {
        data: forums,
        isLoading,
        status,
        error,
    } = useAuthFetch<GetAllCommunitiesResponse>(`/api/community/all`);
    {
        /*TODO: Replace with User community ID lookup, and subsequent fetching of set IDs from community table */
    }
    const [communityName, setCommunityName] = useState("");
    const [communityDescription, setCommunityDescription] = useState("");
    const {paddingButton, padding} = useUISettings();
    const filteredForums = forums?.slice(2);
    return (
        <div className="flex flex-col gap-3">
            <Card
                className={`p-${padding} border-secondary gap-3 overflow-y-auto min-h-36`}
            >
                <CardTitle>Forums</CardTitle>
                {filteredForums ? (
                    filteredForums.map((forum) => (
                        <Link
                            href={`/forum/${forum.communityID}`}
                            key={forum.communityID}
                        >
                            <Button variant={"ghost"} className={"text-white w-full justify-start pl-0"}>
                                <Avatar>
                                    <AvatarFallback>{forum.names.slice(0, 1)}</AvatarFallback>
                                </Avatar>
                                {forum.names}
                            </Button>
                        </Link>
                    ))
                ) : isLoading ? (
                    <LoadingSpinner className={"top-20"}/>
                ) : null}
            </Card>
        </div>
    );
}
