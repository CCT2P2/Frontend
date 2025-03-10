import {Input} from "@/components/ui/input"
import logo from "/src/assets/GNUF.svg";
import {Label} from "@/components/ui/label.tsx";
import {useActionState} from "react";
import {signIn} from "@/lib/actions.ts";


export default function LoginPage() {
    const [errorMessage, dispatch] = useActionState(signIn, undefined)

    return (
        <div className={"font-inter flex flex-col items-center justify-center h-[calc(100vh-5rem)]"}>
            <form action={dispatch}
                  className={"w-96 mx-auto align-middle border-2 border-purple-400 rounded-3xl p-10 pt-4 relative bg-black group focus-within:something"}>
                <div
                    className={"absolute bg-purple-300/30 w-[103%] h-[104%] -left-2 -top-2 -z-50 blur-md rounded-xl"}></div>
                <div className={"flex justify-center mb-4"}>
                    <img className={"p-2 w-[50%]"} src={logo} alt="Home"/>
                </div>
                <h1 className={"text-2xl font-bold"}>Log in</h1>
                <div className={"my-6 grid gap-2"}>
                    <Label htmlFor={"username"} className={"ml-2"}>Username</Label>
                    <div className={"relative"}>
                        <Input
                            type="text"
                            className="peer bg-black z-20 rounded-2xl w-full outline-none focus:border-purple-400"
                            placeholder="Username"
                            id={"username"}
                            required
                        />
                        <div
                            className={"peer-[:focus]:bg-purple-300/50 bg-purple-400/10 absolute inset-[0%] z-10 blur-[8px] rounded-xl transition duration-500 ease-out"}></div>
                    </div>
                </div>
                <div className={"mt-6 grid gap-2"}>
                    <Label htmlFor={"password"} className={"ml-2"}>Password</Label>
                    <div className={"relative"}>
                        <Input
                            type="password"
                            className="peer bg-black z-20 rounded-2xl w-full outline-none focus:border-purple-400"
                            placeholder="Password"
                            id={"password"}
                            required
                        />
                        <div
                            className={"peer-[:focus]:bg-purple-300/50 bg-purple-400/10 absolute inset-[0%] z-10 blur-[8px] rounded-xl transition duration-500 ease-out"}></div>
                    </div>
                </div>
                <a className={"text-purple-300 text-xs ml-2"} href={"https://cornhub.website"}>Forgot your
                    password?</a>
                <div className={"flex flex-col justify-center gap-8 mt-10"}>
                    <button
                        className="px-4 py-2 bg-black border-2 text-blue-300 rounded-2xl border-blue-300 hover:text-black hover:bg-blue-300 transition-all duration-200">
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
        </div>
    )
}