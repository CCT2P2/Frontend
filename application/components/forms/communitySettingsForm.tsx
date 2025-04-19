//this page should only be accesible with the user admin flag being set

"use client";

import { useActionState, useState } from "react";
import { createAccount } from "@/lib/actions/createAccount";
import { Button } from "@/components/ui/button";
import { useUISettings } from "@/app/store/useUISettings";
import { Card, CardTitle } from "../ui/card";
import { useAllForums } from "@/lib/data/getAllForums";
import { XIcon } from "lucide-react";

export default function CommunitySettingsForm() {
  const [formState, dispatch] = useActionState(createAccount, {});
  const { paddingButton, padding } = useUISettings();
  const { blur } = useUISettings();

  const [selectedCommunity, setSelectedCommunity] = useState("None");

  const [communityName, setCommunityName] = useState("");
  const [communityDescription, setCommunityDescription] = useState("");

  const [showCreateDialog, setShowCreateDialog] = useState(false);

  const forumsResponse = useAllForums();
  let key = 0;

  return (
    <div>
      <Card
        className={`p-${padding} border-secondary gap-3 overflow-y-auto max-h-[80%]`}
      >
        <CardTitle>Forums</CardTitle>
        {forumsResponse?.data ? (
          forumsResponse.data.map((forum) => (
            <Card
              key={forum.communityID}
              className={`p-${paddingButton} transition-colors duration-200 hover:bg-secondary/15`}
              onClick={() => {
                key = forum.communityID;
                setSelectedCommunity(forum.names + " #" + key);
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
        <p>Selected Community: {selectedCommunity}</p>
        <div className="flex gap-2">
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
                  onClick={() => {
                    // handle create
                    setShowCreateDialog(false);
                  }}
                >
                  Create
                </Button>
              </div>
            </Card>
          </div>
        )}
      </Card>
    </div>
  );
}
