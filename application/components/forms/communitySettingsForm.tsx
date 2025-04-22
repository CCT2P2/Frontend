//this page should only be accesible with the user admin flag being set

"use client";

import { useActionState, useState } from "react";
import { createAccount } from "@/lib/actions/createAccount";
import { Button } from "@/components/ui/button";
import { useUISettings } from "@/app/store/useUISettings";
import { Card, CardTitle } from "../ui/card";
import { XIcon } from "lucide-react";
import { useAuthFetch } from "@/lib/hooks/useAuthFetch";
import LoadingSpinner from "@/components/general/loadingSpinner";
import { GetAllCommunitiesResponse } from "@/lib/apiTypes";
import { createCommunity } from "@/lib/actions/createCommunity";
import { updateCommunity } from "@/lib/actions/updateCommunity";

export default function CommunitySettingsForm() {
  const { paddingButton, padding } = useUISettings();

  const [selectedCommunity, setSelectedCommunity] = useState<{
    id: number;
    name: string;
    description: string;
  } | null>(null);

  const [communityName, setCommunityName] = useState("");
  const [communityDescription, setCommunityDescription] = useState("");

  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);

  const {
    data: forums,
    isLoading,
    status,
    error,
  } = useAuthFetch<GetAllCommunitiesResponse>(`/api/community/all`);
  const filteredForums = forums?.slice(2);
  if (isLoading) return <LoadingSpinner />;

  if (error || !forums) {
    return (
      <div className="p-4 text-center">
        <p className="text-red-500">Failed to load user profile</p>
        <p className="text-sm text-gray-500">{error}</p>
      </div>
    );
  }

  console.log(forums);

  return (
    <div>
      <Card
        className={`p-${padding} border-secondary gap-3 overflow-y-auto max-h-[80%]`}
      >
        <CardTitle>Forums</CardTitle>
        {filteredForums ? (
            filteredForums.map((forum) => (
            <Card
              key={forum.communityID}
              className={`p-${paddingButton} transition-colors duration-200 hover:bg-secondary/15`}
              onClick={() => {
                setCommunityName(forum.names);
                setCommunityDescription(forum.description);
                setSelectedCommunity({
                  id: forum.communityID,
                  name: forum.names,
                  description: forum.description,
                });
              }}
            >
              <div>{forum.names}</div>
            </Card>
          ))
        ) : (
          <p>Loading forums...</p>
        )}
      </Card>

      <Card className="gap-3 p-4 mt-4">
        <CardTitle>Forum Administration</CardTitle>
        <p>Selected Community: {selectedCommunity?.name}</p>
        <div className="flex-row gap-8">
          <Button
            variant="outline"
            onClick={() => {
              setShowCreateDialog(true);
            }}
            className="bg-green-600 border-green-600 hover:bg-green-700"
          >
            Create Forum
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              // handle delete with key
            }}
            className="bg-red-600 border-red-600 hover:bg-red-700"
          >
            Delete Forum
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              setShowEditDialog(true);
            }}
            className="bg-yellow-600 border-yellow-600 hover:bg-yellow-700"
          >
            Edit Forum
          </Button>
        </div>

        {showCreateDialog && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <Card className="w-96 p-4">
              <div className="flex justify-between items-center mb-4">
                <CardTitle>Create New Community</CardTitle>
                <Button
                  variant="ghost"
                  onClick={() => setShowCreateDialog(false)}
                >
                  <XIcon className="h-4 w-4" />
                </Button>
              </div>

              <input
                type="text"
                value={communityName}
                onChange={(e) => setCommunityName(e.target.value)}
                placeholder="Enter community name"
                className="w-full p-2 border rounded"
              />

              <input
                type="text"
                value={communityDescription}
                onChange={(e) => setCommunityDescription(e.target.value)}
                placeholder="Enter community Description"
                className="w-full p-2 border rounded"
              />

              <div className="flex justify-end gap-2 mt-4">
                <Button
                  variant="outline"
                  onClick={() => setShowCreateDialog(false)}
                >
                  Cancel
                </Button>
                <Button
                  variant="outline"
                  onClick={async () => {
                    const formData = new FormData();
                    formData.append("name", communityName);
                    formData.append("description", communityDescription);

                    await createCommunity(undefined, formData);
                    setShowCreateDialog(false);
                  }}
                >
                  Create
                </Button>
              </div>
            </Card>
          </div>
        )}
        {showEditDialog && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <Card className="w-96 p-4">
              <div className="flex justify-between items-center mb-4">
                <CardTitle>Edit Community</CardTitle>
                <Button
                  variant="ghost"
                  onClick={() => setShowEditDialog(false)}
                >
                  <XIcon className="h-4 w-4" />
                </Button>
              </div>

              <input
                type="text"
                value={communityName}
                onChange={(e) => setCommunityName(e.target.value)}
                placeholder={selectedCommunity?.name || ""}
                className="w-full p-2 border rounded"
              />

              <input
                type="text"
                value={communityDescription}
                onChange={(e) => setCommunityDescription(e.target.value)}
                placeholder={selectedCommunity?.description || ""}
                className="w-full p-2 border rounded"
              />

              <div className="flex justify-end gap-2 mt-4">
                <Button
                  variant="outline"
                  onClick={() => setShowEditDialog(false)}
                >
                  Cancel
                </Button>
                <Button
                  variant="outline"
                  onClick={async () => {
                    if (!selectedCommunity) return; // guard just in case

                    const formData = new FormData();
                    formData.append("id", selectedCommunity.id.toString());
                    formData.append("name", communityName);
                    formData.append("description", communityDescription);

                    await updateCommunity(undefined, formData);
                    setShowEditDialog(false);
                  }}
                >
                  Update
                </Button>
              </div>
            </Card>
          </div>
        )}
      </Card>
    </div>
  );
}
