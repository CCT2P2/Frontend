import {Label} from "@radix-ui/react-label";
import {Checkbox} from "@/components/ui/checkbox.tsx";
import {useActionState} from "react";
import {createAccount} from "@/lib/actions/createAccount.ts";
import logo from "/src/assets/GNUF.svg";
import {AccountFormInput} from "@/components/forms/formComponents.tsx";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card.tsx";

export default function RegisterForm() {
    // uses the useActionState hook to initialize form state and a dispatch function
    // formState is the current state of the form, stuff like validation errors and whats in the different input fields
    // dispatch is a function that allows triggering the createAccount action with the form data when its submitted
    // the data given to createAccount is based on the `name` of the inputs
    const [formState, dispatch] = useActionState(createAccount, {})
    return (
        <Card className={"w-[28rem] relative"}>
            <div
                className={"absolute bg-secondary/20 w-[103%] h-[101.7%] -left-2 -top-2 -z-50 blur-md rounded-3xl"}></div>
            <CardHeader>
                <div className={"flex justify-center mb-4"}>
                    <img className={"p-2 w-[50%]"} src={logo} alt="Home"/>
                </div>
                <CardTitle>Register</CardTitle>
            </CardHeader>
            <CardContent>
                <form action={dispatch}>
                    <div className={"flex flex-col gap-4 mt-4"}>
                        <AccountFormInput formState={formState} fieldName={"username"} label={"Username"}/>
                        <AccountFormInput formState={formState} fieldName={"email"} label={"Email"}/>
                        <AccountFormInput formState={formState} fieldName={"password"} label={"Password"}/>
                        <AccountFormInput formState={formState} fieldName={"confirmPassword"} label={"Confirm Password"}/>
                    </div>
                    <div className={"flex gap-2 mt-6 items-center"}>
                        <Checkbox id={"age"} required/>
                        <Label htmlFor={"age"}>I confirm that I am above the age of 16</Label>
                    </div>
                    <div className={"flex gap-2 mt-4 items-center"}>
                        <Checkbox id={"tos"} required/>
                        <Label htmlFor={"tos"}>I agree to Terms and Conditions</Label>
                    </div>
                    <div className={"flex flex-col justify-center gap-8 mt-10"}>
                        <button
                            className="px-4 py-2 bg-black border-2 text-purple-300 rounded-2xl border-primary hover:text-black hover:bg-purple-300 transition-all duration-300">
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
            </CardContent>
        </Card>
    )
}


// export function OldRegisterForm() {
//     // uses the useActionState hook to initialize form state and a dispatch function
//     // formState is the current state of the form, stuff like validation errors and whats in the different input fields
//     // dispatch is a function that allows triggering the createAccount action with the form data when its submitted
//     // the data given to createAccount is based on the `name` of the inputs
//     const [formState, dispatch] = useActionState(createAccount, {})
//     return (
//         <form action={dispatch}
//               className={"w-[28rem] mx-auto align-middle border-2 border-purple-400 rounded-3xl p-10 pt-4 relative bg-black group focus-within:something"}>
//             <div
//                 className={"absolute bg-secondary/20 w-[103%] h-[101.7%] -left-2 -top-2 -z-50 blur-md rounded-3xl"}></div>
//             <div className={"flex justify-center mb-4"}>
//                 <img className={"p-2 w-[50%]"} src={logo} alt="Home"/>
//             </div>
//             <h1 className={"text-2xl font-bold"}>Register</h1>
//             <div className={"flex flex-col gap-4 mt-4"}>
//                 <AccountFormInput formState={formState} fieldName={"username"} label={"Username"}/>
//                 <AccountFormInput formState={formState} fieldName={"email"} label={"Email"}/>
//                 <AccountFormInput formState={formState} fieldName={"password"} label={"Password"}/>
//                 <AccountFormInput formState={formState} fieldName={"confirmPassword"} label={"Confirm Password"}/>
//             </div>
//             <div className={"flex gap-2 mt-6 items-center"}>
//                 <Checkbox id={"age"} required/>
//                 <Label htmlFor={"age"}>I confirm that I am above the age of 16</Label>
//             </div>
//             <div className={"flex gap-2 mt-4 items-center"}>
//                 <Checkbox id={"tos"} required/>
//                 <Label htmlFor={"tos"}>I agree to Terms and Conditions</Label>
//             </div>
//             <div className={"flex flex-col justify-center gap-8 mt-10"}>
//                 <button
//                     className="px-4 py-2 bg-black border-2 text-purple-300 rounded-2xl border-primary hover:text-black hover:bg-purple-300 transition-all duration-300">
//                     Register
//                 </button>
//                 <div className="text-center text-sm">
//                     Already have an account?{" "}
//                     <a href="/login" className="underline underline-offset-4 text-purple-300">
//                         Sign in
//                     </a>
//                 </div>
//             </div>
//         </form>
//     )
// }