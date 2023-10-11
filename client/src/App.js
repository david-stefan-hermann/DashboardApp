import { createBrowserRouter, RouterProvider, Route, Outlet } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

import Header from "./components/Header";
import Footer from "./components/Footer";
import CredentialSiteFrame from "./components/CredentialSiteFrame";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import About from "./pages/About";
import Blog from "./pages/Blog";
import SinglePage from "./pages/SinglePage";

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
        path: "/doku",
        element: <Blog title="Doku Seite"></Blog>
      },
      {
        path: "/doku/post/:id",
        element: <SinglePage></SinglePage>
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
