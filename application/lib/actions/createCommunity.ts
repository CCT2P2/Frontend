import { z } from "zod";
import {getSession} from "next-auth/react";
import {generateFormResponse} from "@/lib/actions/actionsHelperFunctions";
import {CreateCommunityRequest} from "@/lib/apiTypes";

// for comments on how this works go to createAccount, basically same logic
const createCommunitySchema = z.object({
  name: z
    .string()
    .min(3, { message: "Community name must be at least 3 characters" })
    .max(100, {
      message: "Community name must not be more than 100 characters",
    }),

  description: z.string().max(500, {
    message: "Community description must not be more than 500 characters",
  }),
});

export async function createCommunity(
  _prevState: string | undefined,
  formData: FormData,
) {
  const validatedField = createCommunitySchema.safeParse({
    name: formData.get("name"),
    description: formData.get("description"),
  });

  if (!validatedField.success) {
    return {
      errors: validatedField.error.flatten().fieldErrors,
      message: "Missing or invalid fields, failed to create community",
    };
  }

  const requestData: CreateCommunityRequest = {
    Name: validatedField.data.name,
    Description: validatedField.data.description,
    Tags: "", // <-- important
    Img_path: null, // <-- optional
  };

  const session = await getSession()

  if (!session?.user) {
    return generateFormResponse(formData, validatedField, "Not logged in, failed to create community")
  }

  const response = await fetch(
    `/api/community/create`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${session.accessToken}`,
      },
      body: JSON.stringify(requestData),
    },
  );

  if (!response.ok) {
    return {
      errors: {},
      message: `Error creating community: ${response.statusText}`,
    };
  }

  const responseData = await response.json();
  const communityId = responseData.communityId;

  return {
    message: "Community created successfully",
    communityId: communityId,
  };
}
