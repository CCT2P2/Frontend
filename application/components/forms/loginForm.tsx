"use client";

import {useActionState} from "react";
import {login} from "@/lib/actions/login";
import {FormInput} from "@/components/forms/formComponents";
import Image from "next/image";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import Link from "next/dist/client/app-dir/link";
import {useUISettings} from "@/app/store/useUISettings";

export default function LoginForm() {
    const [formState, dispatch] = useActionState(login, {});
    const {blur} = useUISettings();
    return (
        <Card
            className={`w-96 relative py-8 light-glow-primary`}
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
                <CardTitle>Log in</CardTitle>
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
                            required
                        />
                        <FormInput
                            formState={formState}
                            fieldName={"password"}
                            label={"Password"}
                            placeholder={"Password"}
                            inputType={"password"}
                            required
                        />
                    </div>
                    <a
                        className={"text-purple-300 text-xs ml-2"}
                        href={"https://cornhub.website"}
                    >
                        Forgot your password?
                    </a>
                    <div className={"flex flex-col justify-center gap-8 mt-10"}>
                        <Button
                            variant={"outline"}
                            size={"lg"}
                            className={`${blur ? "bg-stone-800/20" : "bg-black"}`}
                        >
                            Log in
                        </Button>
                        <div className="text-center text-sm">
                            {"Don't have an account? "}
                            <a
                                href="/register"
                                className="underline underline-offset-4 text-purple-300"
                            >
                                Sign up
                            </a>
                        </div>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}