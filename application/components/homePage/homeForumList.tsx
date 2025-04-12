"use client";
import { Card, CardTitle } from "@/components/ui/card";
import { useUISettings } from "@/app/store/useUISettings";

export default function HomeForumList({
  backgroundColor,
}: {
  backgroundColor: string;
}) {
  const { paddingButton, padding } = useUISettings();
  return (
    <div className="h-screen flex flex-col gap-3">
      <Card
        className={`p-${padding} border-secondary gap-3 overflow-y-auto max-h-[80%] backdrop-blur-md ${backgroundColor}`}
      >
        <CardTitle>Forums</CardTitle>
        <Card
          className={`p-${paddingButton} transition-colors duration-200 ${backgroundColor}`}
        >
          Whyy
        </Card>
        <Card
          className={`p-${paddingButton} transition-colors duration-200 ${backgroundColor}`}
        >
          BigQuestions
        </Card>
        <Card
          className={`p-${paddingButton} transition-colors duration-200 ${backgroundColor}`}
        >
          wowsers
        </Card>{" "}
        <Card
          className={`p-${paddingButton} transition-colors duration-200 ${backgroundColor}`}
        >
          Whyy
        </Card>
        <Card
          className={`p-${paddingButton} transition-colors duration-200 ${backgroundColor}`}
        >
          BigQuestions
        </Card>
        <Card
          className={`p-${paddingButton} transition-colors duration-200 ${backgroundColor}`}
        >
          wowsers
        </Card>{" "}
        <Card
          className={`p-${paddingButton} transition-colors duration-200 ${backgroundColor}`}
        >
          Whyy
        </Card>
      </Card>
    </div>
  );
}
