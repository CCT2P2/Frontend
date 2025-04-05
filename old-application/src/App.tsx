import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from "react-router";
import Root from "./pages/Root.tsx";
import LoginPage from "./pages/LoginPage.tsx";
import RegisterPage from "@/pages/RegisterPage.tsx";
import HomePage from "@/pages/HomePage.tsx";
import UserPage from "@/pages/UserPage.tsx";
import {Suspense} from "react";
import path from "path";
import {getUserProfile} from "@/lib/data/getUserProfile.ts";

const router = createBrowserRouter(createRoutesFromElements(
    <Route path={'/'}>
        <Route path={'/'} element={<Root/>}>
            <Route path={'/home'} element={<HomePage/>}/>
            <Route path={'/user/:userId'} element={
                <Suspense fallback={<div>Loading...</div>}>
                    <UserPage/>
                </Suspense>
            }/>
        </Route>
        <Route path={'/login'} element={<LoginPage/>}/>
        <Route path={'/register'} element={<RegisterPage/>}/>
    </Route>
), {basename: "/"})
//
// const router = createBrowserRouter([
//     {
//         path: "/", children:
//             [
//         {
//             path: "/",
//             Component: Root,
//             children: [
//                 { path: "/home", Component: HomePage },
//                 {
//                     path: "/user/:userid",
//                     Component: UserPage,
//                     loader: async ({params}) => {
//                         if (!params.userId) {
//                             return "Error: Param not found"
//                         }
//
//                         return await getUserProfile(params.userId);
//                     }
//                 }
//             ]
//         }
//         ]}
// ])


function App() {
    return (
        <RouterProvider router={router}/>
    )
}

export default App
