import {Outlet} from "react-router";
import {NavLink} from "react-router";
import logo from "/src/assets/GNUF.svg";

export default function Root() {
    return (
        <>
            <div
                className={"h-10 bg-black flex items-center gap-4"}>
                <NavLink
                    to="/login"
                    className={({isActive, isPending}) =>
                        isPending ? "pending" : isActive ? "active" : ""
                    }
                >
                    <img className={"p-2 w-[10%]"} src={logo} alt="Home"/>
                </NavLink>
                <p>man</p>
            </div>
            <main className={"container m-auto h-screen"}>
                <Outlet/>
            </main>
        </>
    )
}