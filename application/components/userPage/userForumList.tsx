import { Card } from "@/components/ui/card";

export default function UserForumList({
  backgroundColor,
}: {
  backgroundColor?: string;
}) {
  return (
    <Card className={`light-glow-primary ${backgroundColor} backdrop-blur-md`}>
      holy forum
    </Card>
  );
}
