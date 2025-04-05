import logo from "@/assets/GNUF.svg";
import {useActionState} from "react";
import {login} from "@/lib/actions/login.ts";
import {AccountFormInput} from "@/components/forms/formComponents.tsx";

// TODO: Convert to using card instead, should be easy
export default function LoginForm () {
    const [formState, dispatch] = useActionState(login, {})
    return (
        <form action={dispatch}
              className={"w-96 mx-auto align-middle border-2 border-purple-400 rounded-3xl p-10 pt-4 relative bg-black group focus-within:something"}>
            <div
                className={"absolute bg-secondary/30 w-[103%] h-[103%] -left-2 -top-2 -z-50 blur-md rounded-xl"}></div>
            <div className={"flex justify-center mb-4"}>
                <img className={"p-2 w-[50%]"} src={logo} alt="Home"/>
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