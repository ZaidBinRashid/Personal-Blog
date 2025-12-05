import App from "./App";
import ErrorPage from "./errorPage";

const routes = [
    {
        path: "/",
        element: <App/>,
        errorElement: <ErrorPage/>,
    }
]

export default routes;