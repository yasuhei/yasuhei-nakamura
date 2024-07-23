
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { Home } from "./pages/home"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  }
],{
  basename: "/yasuhei-nakamura",

}
)

export function App() { 
    return <RouterProvider router={router} />

}

