"use client";

import {Dispatch, SetStateAction, useActionState, useEffect, useState} from "react";
import {login} from "@/lib/actions/login";
import {FormInput} from "@/components/forms/formComponents";
import Image from "next/image";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {useUISettings} from "@/app/store/useUISettings";
import Link from "next/link";
import {useFormStatus} from "react-dom";

export default function LoginForm() {
    const [formState, dispatch] = useActionState(login, {});
    const [pending, setPending] = useState(false)

    return (
        <Card className={`w-96 relative py-8 light-glow-primary`}>
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
                <CardTitle>Log in</CardTitle>
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
                            fieldName={"password"}
                            label={"Password"}
                            placeholder={"Password"}
                            inputType={"password"}
                            isPending={pending}
                            required
                        />
                    </div>
                    <Link
                        className={"text-purple-300 text-xs ml-2"}
                        href={"/"} // TODO: make an actual forgot password page
                    >
                        Forgot your password?
                    </Link>
                    <div className={"flex flex-col justify-center gap-8 mt-10"}>
                        <LoginButton setPending={setPending}/>
                        <div className="text-center text-sm">
                            {"Don't have an account? "}
                            <Link
                                href="/register"
                                className="underline underline-offset-4 text-purple-300"
                            >
                                Sign up
                            </Link>
                        </div>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}

function LoginButton({setPending}: { setPending: Dispatch<SetStateAction<boolean>> }) {
    const status = useFormStatus()

    useEffect(() => {
        setPending(status.pending)
    }, [setPending, status.pending]);

    return (
        <Button
            variant={"outline"}
            size={"lg"}
            disabled={status.pending}
        >
            {status.pending ? "Loading..." : "Login"}
        </Button>
    )
}