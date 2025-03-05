import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from "react-router";
import Root from "./pages/Root.tsx";
import LoginPage from "./pages/LoginPage.tsx";

const router = createBrowserRouter(createRoutesFromElements(
    <Route path={'/'} element={<Root/>}>
        <Route path={'/login'} element={<LoginPage/>}/>
    </Route>
), {basename: "/"})

function App() {
  return (
      <RouterProvider router={router}/>
  )
}

export default App
