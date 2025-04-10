import { FeedbackFormInput } from "./formComponents";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function FeedbackForm() {
  //const [formState, dispatch] = useActionState(login, {});
  return (
    <Card className={"w-200 relative py-20"}>
      <div
        className={
          "absolute bg-secondary/20 w-[103%] h-[101.7%] -left-2 -top-2 -z-50 blur-md rounded-3xl"
        }
      ></div>
      <CardHeader>
        <div className={"flex justify-center mb-4"}>
          <Image
            src={"/GNUF.svg"}
            alt="Home"
            width={300}
            height={300}
            className={"p-2"}
          />
        </div>
        <CardTitle>Feedback</CardTitle>
      </CardHeader>
      <CardContent>
        <form action="dick">
          <div className={"flex flex-col gap-4 mt-4"}>
            <FeedbackFormInput fieldName="worked" label="What worked well?" />
            <FeedbackFormInput
              fieldName="didnt"
              label="What didn't work well?"
            />
            <FeedbackFormInput
              fieldName="other"
              label="What else would you like to share?"
            />
          </div>
          <div className={"flex flex-col justify-center gap-8 mt-10"}>
            <Button variant={"outline"} size={"lg"}>
              Submit
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
