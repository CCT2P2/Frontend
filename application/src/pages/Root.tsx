import {Outlet} from "react-router";

export default function Root() {
    return (
        <>
            <div className={"h-28 bg-amber-400"}>
                <p>Header</p>
            </div>
            <main className={"container bg-blue-200 m-auto h-screen"}>
                <Outlet/>
            </main>
        </>
    )
}