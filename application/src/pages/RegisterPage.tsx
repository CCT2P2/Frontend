import {Button} from "../components/ui/button.tsx";
import {SetStateAction, useState} from "react";

export default function RegisterPage() {
    const [inputValue, setInputValue] = useState("");

    const handleChange = (event: { target: { value: SetStateAction<string>; }; }) => {
        setInputValue(event.target.value);
    };
    return (
        <div className={"max-w-xl mx-auto"}>
            <h1 className={"text-3xl"}>Sign Up</h1>
            <input
                type="text"
                value={inputValue}
                onChange={handleChange}
                className="mt-2 p-2 border rounded w-full"
                placeholder="Name"
            />
            <input
                type="text"
                value={inputValue}
                onChange={handleChange}
                className="mt-2 p-2 border rounded w-full"
                placeholder="Username"
            />
            <input
                type="text"
                value={inputValue}
                onChange={handleChange}
                className="mt-2 p-2 border rounded w-full"
                placeholder="Email"
            />
            <input
                type="password"
                value={inputValue}
                onChange={handleChange}
                className="mt-2 p-2 border rounded w-full"
                placeholder="Password"
            />
            <input
                type="password"
                value={inputValue}
                onChange={handleChange}
                className="mt-2 p-2 border rounded w-full"
                placeholder="Repeat Password"
            />
            <div className={"flex justify-around"}>
                <Button>Sign Up!</Button>
            </div>
        </div>
    )
}
