import {SetStateAction, useState} from "react";
import {useNavigate} from "react-router";
import {Input} from "@/components/ui/input"
import logo from "/src/assets/GNUF.svg";


export default function LoginPage() {
    const [inputValue, setInputValue] = useState("");

    const handleChange = (event: { target: { value: SetStateAction<string>; }; }) => {
        setInputValue(event.target.value);
    };

    const navigate = useNavigate();

    const login_redirect = () => {
        navigate("/register"); // Change to your desired route
    };

    const home_redirect = () => {
        navigate("/home"); // Change to your desired route
    };
    return (

        <div className={"flex flex-col items-center justify-center h-[calc(100vh-5rem)]"}>
            <div
                className={"w-[50%] mx-auto align-middle border-2 border-purple-400 rounded-3xl p-10 relative bg-black"}>
                <div
                    className={"absolute bg-purple-300/30 w-[103%] h-[104%] -left-2 -top-2 -z-50 blur-md rounded-xl"}></div>
                <div className={"flex justify-end"}>
                    <img className={"p-2 w-[50%]"} src={logo} alt="Home"/>
                </div>
                <h1 className={"text-3xl"}>Login</h1>
                <Input
                    type="text"
                    value={inputValue}
                    onChange={handleChange}
                    className="mt-2 p-2 border w-full  my-4"
                    placeholder="Username"
                />
                <Input
                    type="password"
                    value={inputValue}
                    onChange={handleChange}
                    className="mt-2 p-2 border w-full border-white rounded-2xl my-4"
                    placeholder="Password"
                />
                <a className={"text-blue-500 underline"} href={"https://cornhub.website"}>Forgot your password</a>
                <div className={"flex justify-center gap-8 mt-10"}>
                    <button
                        onClick={home_redirect}
                        className="px-4 py-2 bg-green-500 text-white rounded">
                        Login
                    </button>
                    <button
                        onClick={login_redirect}
                        className="px-4 py-2 bg-blue-500 text-white rounded">
                        Sign Up!
                    </button>
                </div>
            </div>
        </div>
    )
}
