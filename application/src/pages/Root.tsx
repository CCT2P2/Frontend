import {Outlet} from "react-router";

export default function Root() {
    return (
        <>
            <main>
                <div className={"h-28 bg-amber-400"}>
                    <p>Header</p>
                </div>
                <Outlet/>
            </main>
        </>
    )
}