import App from "./App";
import ErrorPage from "./errorPage";
import Hero from "./components/Hero"
import Articles from "./components/Articles";

const routes = [
    {
        path: "/",
        element: <App/>,
        errorElement: <ErrorPage/>,
        children: [
            {
                index: true,
                element:(
                    <>
                       <Hero />, 
                    </>
                ),
            },
            {
                path: "articles",
                element: <Articles />,
            }
        ]
    }
]

export default routes;