import {useState} from "react";
import {NavLink, useNavigate} from "react-router";
import {Input} from "@/components/ui/input"
import logo from "/src/assets/GNUF.svg";


export default function LoginPage() {
    const [inputValue, setInputValue] = useState("");

    const handleChange = (event) => {
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
                className={"w-96 mx-auto align-middle border-2 border-purple-400 rounded-3xl p-10 pt-4 relative bg-black group focus-within:something"}>
                <div
                    className={"absolute bg-purple-300/30 w-[103%] h-[104%] -left-2 -top-2 -z-50 blur-md rounded-xl"}></div>
                <div className={"flex justify-center mb-4"}>
                    <img className={"p-2 w-[50%]"} src={logo} alt="Home"/>
                </div>
                <h1 className={"text-3xl"}>Login</h1>
                <div className={"relative"}>
                    <Input
                        type="text"
                        value={inputValue}
                        onChange={handleChange}
                        className="peer bg-black z-20 mt-2 p-2 rounded-2xl border-white w-full my-4 outline-none focus:border-purple-400"
                        placeholder="Username"
                    />
                    <div
                        className={"peer-[:focus]:bg-purple-300/50 bg-purple-400/10 absolute inset-[0%] z-10 blur-[8px] rounded-xl transition duration-500 ease-out"}></div>
                </div>
                <div className={"relative"}>
                    <Input
                        type="password"
                        value={inputValue}
                        onChange={handleChange}
                        className="peer bg-black z-20 mt-2 p-2 rounded-2xl border-white w-full outline-none focus:border-purple-400"
                        placeholder="Password"
                    />
                    <div
                        className={"peer-[:focus]:bg-purple-300/50 bg-purple-400/10 absolute inset-[0%] z-10 blur-[8px] rounded-xl transition duration-500 ease-out"}></div>
                </div>
                <a className={"text-purple-300/60 text-xs"} href={"https://cornhub.website"}>Forgot your
                    password?</a>
                <div className={"flex justify-center gap-8 mt-10"}>
                    <button
                        onClick={home_redirect}
                        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-purple-300 transition-all duration-500">
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