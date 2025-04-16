import { GetCommunityResponse } from "../apiTypes";

export async function getForumData(
  forumId: string,
): Promise<GetCommunityResponse> {
  const response = await fetch(`/api/community/details/${forumId}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch forum data: ${response.status}`);
  }
  const data = await response.json();
  return data;
}
