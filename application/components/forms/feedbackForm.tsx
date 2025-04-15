"use client";

import { FeedbackFormInput } from "./formComponents";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { useState, useActionState } from "react";
import { useUISettings } from "@/app/store/useUISettings";
type FormState = Record<string, unknown>;

export default function FeedbackForm() {
  const [, dispatch] = useActionState<FormState, FormData>(
    async (prevState, formData) => {
      // Do something with the formData
      console.log("form submitted", formData);

      // For now, just return the previous state
      return prevState;
    },
    {}, // initial state
  );
  const [rating, setRating] = useState([0]);
  const { blur } = useUISettings();
  return (
    <Card
      className={`w-150 relative py-10 ${blur ? "bg-stone-800/20" : "bg-black"} backdrop-blur-md`}
    >
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
              formState={{}}
              fieldName="worked"
              label="What worked well?"
              required
            />
            <FeedbackFormInput
              formState={{}}
              fieldName="didnt"
              label="What didn't work well?"
              required
            />
            <FeedbackFormInput
              formState={{}}
              fieldName="other"
              label="What else would you like to share?"
            />
          </div>
          <div className="mt-4 mb-2">Rating: {rating[0]}</div>
          <Slider
            value={rating}
            onValueChange={setRating}
            max={5}
            step={1}
            className={`${blur ? "bg-stone-800/20" : "bg-black"} backdrop-blur-md `}
          />
          <div
            className={`flex flex-col ${blur ? "bg-stone-800/20" : "bg-black"} backdrop-blur-md justify-center gap-10 mt-10`}
          >
            <Button variant={"outline"} size={"lg"} className="bg-transparent">
              Submit
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
