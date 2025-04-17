"use client";
import { Card, CardTitle } from "@/components/ui/card";
import { useUISettings } from "@/app/store/useUISettings";

export default function ForumList() {
  const { paddingButton, padding } = useUISettings();
  return (
    <div className="h-screen flex flex-col gap-3">
      <Card
        className={`p-${padding} border-secondary gap-3 overflow-y-auto max-h-[80%]`}
      >
        <CardTitle>Forums</CardTitle>
        <Card
          className={`p-${paddingButton} transition-colors duration-200 hover:bg-secondary/15`}
        >
          <a href="/forum/-1">The realm of the bannished</a>
        </Card>
        <Card
          className={`p-${paddingButton} transition-colors duration-200 hover:bg-secondary/15`}
        >
          <a href="/forum/3">C#</a>
        </Card>
      </Card>
    </div>
  );
}
