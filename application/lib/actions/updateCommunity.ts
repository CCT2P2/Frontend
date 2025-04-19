import { z } from "zod";

// for comments on how this works go to createAccount, basically same logic
const updateCommunitySchema = z.object({
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

export async function updateCommunity(
  _prevState: string | undefined,
  formData: FormData,
) {
  const validatedField = updateCommunitySchema.safeParse({
    id: formData.get("id"),
    name: formData.get("name"),
    description: formData.get("description"),
  });

  if (!validatedField.success) {
    return {
      errors: validatedField.error.flatten().fieldErrors,
      message: "Missing or invalid fields, failed to update community",
    };
  }

  const requestData = {
    name: validatedField.data.name,
    description: validatedField.data.description,
    tags: [], // <-- important
    img: null, // <-- optional
  };

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/community/update/${validatedField.data.id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    },
  );

  if (!response.ok) {
    return {
      errors: {},
      message: `Error updating community: ${response.statusText}`,
    };
  }

  const responseData = await response.json();
  const communityId = responseData.communityId;

  return {
    message: "Community updated successfully",
    communityId: communityId,
  };
}
