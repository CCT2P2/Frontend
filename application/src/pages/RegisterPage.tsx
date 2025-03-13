import {Button} from "../components/ui/button.tsx";
import {SetStateAction, useState} from "react";

export default function RegisterPage() {
    const [errorMessage, dispatch] = useActionState(signIn, undefined)

    const handleChange = (event: { target: { value: SetStateAction<string>; }; }) => {
        setInputValue(event.target.value);
    };
    return (
        <div className={"font-inter flex flex-col items-center justify-center h-screen"}>
            <form action={dispatch}
                  className={"w-[28rem] mx-auto align-middle border-2 border-purple-400 rounded-3xl p-10 pt-4 relative bg-black group focus-within:something"}>
                <div
                    className={"absolute bg-purple-300/30 w-[103%] h-[102%] -left-2 -top-2 -z-50 blur-md rounded-xl"}></div>
                <div className={"flex justify-center mb-4"}>
                    <img className={"p-2 w-[50%]"} src={logo} alt="Home"/>
                </div>
                <h1 className={"text-2xl font-bold"}>Register</h1>
                <div className={"flex flex-col gap-4 mt-4"}>
                    <div className={"grid gap-2"}>
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
                    <div className={"grid gap-2"}>
                        <Label htmlFor={"email"} className={"ml-2"}>Email</Label>
                        <div className={"relative"}>
                            <Input
                                type="email"
                                className="peer bg-black z-20 rounded-2xl w-full outline-none focus:border-purple-400"
                                placeholder="Email"
                                id={"email"}
                                required
                            />
                            <div
                                className={"peer-[:focus]:bg-purple-300/50 bg-purple-400/10 absolute inset-[0%] z-10 blur-[8px] rounded-xl transition duration-500 ease-out"}></div>
                        </div>
                    </div>
                    <div className={"grid gap-2"}>
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
                    <div className={"grid gap-2"}>
                        <Label htmlFor={"confirm"} className={"ml-2"}>Confirm Password</Label>
                        <div className={"relative"}>
                            <Input
                                type="password"
                                className="peer bg-black z-20 rounded-2xl w-full outline-none focus:border-purple-400"
                                placeholder="Confirm Password"
                                id={"confirm"}
                                required
                            />
                            <div
                                className={"peer-[:focus]:bg-purple-300/50 bg-purple-400/10 absolute inset-[0%] z-10 blur-[8px] rounded-xl transition duration-500 ease-out"}></div>
                        </div>
                    </div>
                </div>
                <div className={"flex gap-2 mt-6 items-center"}>
                    <Checkbox id={"age"}/>
                    <Label htmlFor={"age"}>I agree that I am above the age of 16</Label>
                </div>
                <div className={"flex gap-2 mt-4 items-center"}>
                    <Checkbox id={"tos"}/>
                    <Label htmlFor={"tos"}>I agree to Terms and Conditions</Label>
                </div>
                <div className={"flex flex-col justify-center gap-8 mt-10"}>
                    <button
                        className="px-4 py-2 bg-black border-2 text-blue-300 rounded-2xl border-blue-300 hover:text-black hover:bg-blue-300 transition-all duration-200">
                        Register
                    </button>
                    <div className="text-center text-sm">
                        Already have an account?{" "}
                        <a href="/login" className="underline underline-offset-4 text-purple-300">
                            Sign in
                        </a>
                    </div>
                </div>
            </form>
        </div>
    )
}
