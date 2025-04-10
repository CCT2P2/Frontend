"use client";

import { FeedbackFormInput } from "./formComponents";
import { feedback } from "@/lib/actions/feedback";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { useState, useActionState } from "react";

export default function FeedbackForm() {
  const [formState, dispatch] = useActionState(feedback, {});
  const [rating, setRating] = useState([0]);
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
            width={250}
            height={250}
            className={"p-2"}
          />
        </div>
        <CardTitle>Feedback</CardTitle>
      </CardHeader>
      <CardContent>
        <form action={dispatch}>
          <div className={"flex flex-col gap-4 mt-4"}>
            <FeedbackFormInput
              fieldName="worked"
              label="What worked well?"
              required
            />
            <FeedbackFormInput
              fieldName="didnt"
              label="What didn't work well?"
              required
            />
            <FeedbackFormInput
              fieldName="other"
              label="What else would you like to share?"
            />
          </div>
          <div className="pt-4">Rating: {rating[0]}</div>
          <Slider value={rating} onValueChange={setRating} max={5} step={1} />
          <div className={"flex flex-col justify-center gap-10 mt-10"}>
            <Button variant={"outline"} size={"lg"}>
              Submit
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
