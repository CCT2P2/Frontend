"use client";

import {Label} from "@radix-ui/react-label";
import {Checkbox} from "@/components/ui/checkbox";
import {Dispatch, SetStateAction, useActionState, useState} from "react";
import {createAccount} from "@/lib/actions/createAccount";
import {FormInput} from "@/components/forms/formComponents";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import Image from "next/image";
import {Button} from "@/components/ui/button";
import Link from "next/dist/client/app-dir/link";
import {useUISettings} from "@/app/store/useUISettings";
import {useFormStatus} from "react-dom";
import LoadingSpinner from "@/components/general/loadingSpinner";

export default function RegisterForm() {
    // uses the useActionState hook to initialize form state and a dispatch function
    // formState is the current state of the form, stuff like validation errors and whats in the different input fields
    // dispatch is a function that allows triggering the createAccount action with the form data when its submitted
    // the data given to createAccount is based on the `name` of the inputs

    const [pending, setPending] = useState(false)
    const [formState, dispatch] = useActionState(createAccount, {});
    const {blur} = useUISettings();
    return (
        <Card
            className={`w-[28rem] relative py-8 light-glow-primary`}
        >
            <CardHeader>
                <div className={"flex justify-center mb-4"}>
                    <Image
                        src={"/GNUF.svg"}
                        alt="Home"
                        width={170}
                        height={170}
                        className={"p-2"}
                    />
                </div>
                <CardTitle>Register</CardTitle>
                {(formState.message && !pending) && (
                    <div className="text-red-500">{formState.message}</div>
                )}
            </CardHeader>
            <CardContent>
                <form action={dispatch}>
                    <div className={"flex flex-col gap-4 mt-4"}>
                        <FormInput
                            formState={formState}
                            fieldName={"username"}
                            label={"Username"}
                            placeholder={"Username"}
                            inputType={"text"}
                            isPending={pending}
                            required
                        />
                        <FormInput
                            formState={formState}
                            fieldName={"email"}
                            label={"Email"}
                            placeholder={"name@example.com"}
                            inputType={"email"}
                            isPending={pending}
                            required
                        />
                        <FormInput
                            formState={formState}
                            fieldName={"password"}
                            label={"Password"}
                            placeholder={"password"}
                            inputType={"password"}
                            isPending={pending}
                            required
                        />
                        <FormInput
                            formState={formState}
                            fieldName={"confirmPassword"}
                            label={"Confirm Password"}
                            placeholder={"password"}
                            inputType={"password"}
                            isPending={pending}
                            required
                        />
                    </div>
                    <div className={"flex gap-2 mt-6 items-center"}>
                        <Checkbox id={"age"} required/>
                        <Label htmlFor={"age"}>
                            I confirm that I am above the age of 16
                        </Label>
                    </div>
                    <div className={"flex gap-2 mt-4 items-center"}>
                        <Checkbox id={"tos"} required/>
                        <Label htmlFor={"tos"}>I agree to Terms and Conditions</Label>
                    </div>
                    <div className={"flex flex-col justify-center gap-8 mt-10"}>
                        <RegisterButton setPending={setPending}/>
                        <div className="text-center text-sm">
                            Already have an account?{" "}
                            <Link
                                href="/login"
                                className="underline underline-offset-4 text-purple-300"
                            >
                                Sign in
                            </Link>
                        </div>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}

function RegisterButton({setPending}: { setPending: Dispatch<SetStateAction<boolean>> }) {
    const status = useFormStatus()
    setPending(status.pending)
    return (
        <Button
            variant={"outline"}
            size={"lg"}
            disabled={status.pending}
        >
            {status.pending ? "Loading..." : "Register"}
        </Button>
    )
}
