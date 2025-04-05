'use client'

import {useActionState} from "react";
import {login} from "@/lib/actions/login";
import {AccountFormInput} from "@/components/forms/formComponents";
import Image from "next/image";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";

export default function LoginForm() {
    const [formState, dispatch] = useActionState(login, {})
    return (
        <Card className={"w-96 relative"}>
            <div
                className={"absolute bg-secondary/20 w-[103%] h-[101.7%] -left-2 -top-2 -z-50 blur-md rounded-3xl"}></div>
            <CardHeader>
                <div className={"flex justify-center mb-4"}>
                    <Image src={"/GNUF.svg"} alt="Home" width={170} height={170} className={"p-2"}/>
                </div>
                <CardTitle>Log in</CardTitle>
            </CardHeader>
            <CardContent>
                <form action={dispatch}>
                    <div className={"flex flex-col gap-4 mt-4"}>
                        <AccountFormInput formState={formState} fieldName={"username"} label={"Username"}/>
                        <AccountFormInput formState={formState} fieldName={"password"} label={"Password"}/>
                    </div>
                    <a className={"text-purple-300 text-xs ml-2"} href={"https://cornhub.website"}>Forgot your
                        password?</a>
                    <div className={"flex flex-col justify-center gap-8 mt-10"}>
                        <Button variant={"outline"} size={"lg"}>
                            Log in
                        </Button>
                        <div className="text-center text-sm">
                            Don&apos;t have an account?{" "}
                            <a href="/register" className="underline underline-offset-4 text-purple-300">
                                Sign up
                            </a>
                        </div>
                    </div>
                </form>
            </CardContent>
        </Card>
    )
}


export function OldLoginForm() {
    const [formState, dispatch] = useActionState(login, {})
    return (
        <form action={dispatch}
              className={"w-96 mx-auto align-middle border-2 border-purple-400 rounded-3xl p-10 pt-4 relative bg-black group focus-within:something"}>
            <div
                className={"absolute bg-secondary/30 w-[103%] h-[103%] -left-2 -top-2 -z-50 blur-md rounded-xl"}></div>
            <div className={"flex justify-center mb-4"}>
                <Image src={"/GNUF.svg"} alt="Home" width={150} height={150} className={"p-2"}/>
            </div>
            <h1 className={"text-2xl font-bold"}>Log in</h1>
            <div className={"flex flex-col gap-4 mt-4"}>
                <AccountFormInput formState={formState} fieldName={"username"} label={"Username"}/>
                <AccountFormInput formState={formState} fieldName={"password"} label={"Password"}/>
            </div>
            <a className={"text-purple-300 text-xs ml-2"} href={"https://cornhub.website"}>Forgot your
                password?</a>
            <div className={"flex flex-col justify-center gap-8 mt-10"}>
                <button
                    className="px-4 py-2 bg-black border-2 text-purple-300 rounded-2xl border-purple-300 hover:text-black hover:bg-purple-300 transition-all duration-200">
                    Log in
                </button>
                <div className="text-center text-sm">
                    Don&apos;t have an account?{" "}
                    <a href="/register" className="underline underline-offset-4 text-purple-300">
                        Sign up
                    </a>
                </div>
            </div>
        </form>
    )
}