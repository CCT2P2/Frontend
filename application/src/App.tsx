import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from "react-router";
import Root from "./pages/Root.tsx";
import LoginPage from "./pages/LoginPage.tsx";
import RegisterPage from "@/pages/RegisterPage.tsx";
import HomePage from "@/pages/HomePage.tsx";

const router = createBrowserRouter(createRoutesFromElements(
    <Route path={'/'}>
        <Route path={'/'} element={<Root/>}>
            <Route path={'/home'} element={<HomePage/>}/>
            <Route path={'/register'} element={<RegisterPage/>}/>
        </Route>
        <Route path={'/login'} element={<LoginPage/>}/>
    </Route>
), {basename: "/"})

function App() {
    return (
        <RouterProvider router={router}/>
    )
}

export default App
