import React from "react";
import ReactDom from "react-dom/client";
import Header from "./Components/Header";
import Body from "./Components/Body";
import About from "./Components/About";
import Error from "./Components/Error";
import Contact from "./Components/Contact";
import Footer from "./Components/Footer";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import RestaurantsMenu from "./Components/RestaurantsMenu";
import Login from "./Components/Login";


const AppLayout = () => (
  <React.Fragment>
    <div className="app">
      <Header />
      <Outlet />
      <Footer />
    </div>
  </React.Fragment>
);
const Router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Body />,
      },
      {
        path: "/about",
        element: <About />,
       
      },

      {
        path: "/contact",
        element: <Contact />,
      },

      {
        path: "/restaurants/:resId",
        element: <RestaurantsMenu />,
      },
    ],
  },

  {
    path: "login",
    element: <Login />,
  },
]);

const root = ReactDom.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={Router} />);
