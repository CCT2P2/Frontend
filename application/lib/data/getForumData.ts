import { GetCommunityResponse } from "../apiTypes";

export async function getForumData(
  forumId: string,
  userId: string,
  accessToken: string,
): Promise<GetCommunityResponse> {
  const response = await fetch(`/api/community/details/${forumId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  if (!response.ok) {
    throw new Error(`Failed to fetch forum data: ${response.status}`);
  }
  const data = await response.json();
  return data;
}
