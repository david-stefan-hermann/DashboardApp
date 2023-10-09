import { createBrowserRouter, RouterProvider, Route, Outlet } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

import Header from "./components/Header";
import Footer from "./components/Footer";
import FrontPage from "./pages/FrontPage";
import CredentialSiteFrame from "./components/CredentialSiteFrame";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import About from "./pages/About";
import Portfolio from "./pages/Portfolio";
import Experience from "./pages/Experience";

const Layout = () => {
  return (
    <>
      <Header></Header>
      <Outlet></Outlet>
      <Footer></Footer>
    </>
  )
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout></Layout>,
    children: [
      {
        path: "/",
        element: <About></About>
      },
      {
        path: "/portfolio",
        element: <Portfolio></Portfolio>
      },
      {
        path: "/experience",
        element: <Experience></Experience>
      }
    ]
  },
  {
    path: "/register",
    element: <CredentialSiteFrame site={<Register></Register>}></CredentialSiteFrame>,
  },
  {
    path: "/login",
    element: <CredentialSiteFrame site={<Login></Login>}></CredentialSiteFrame>,
  },
  {
    path: "/logout",
    element: <CredentialSiteFrame site={<Logout></Logout>}></CredentialSiteFrame>,
  },
])


function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
