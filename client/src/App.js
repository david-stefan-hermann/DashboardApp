import { createBrowserRouter, RouterProvider, Route, Outlet } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";
import CredentialSiteFrame from "./components/CredentialSiteFrame";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import Blog from "./pages/Blog";
import PostEditor from "./pages/PostEditor";

import { PostContext } from "./context/postContext"

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
        element: <Blog></Blog>
      },
      {
        path: "/:id",
        element: <Blog></Blog>
      },
      {
        path: "/:id/:title",
        element: <Blog></Blog>
      },
      {
        path: "/edit",
        element: <PostEditor></PostEditor>
      },
      {
        path: "/:id/edit",
        element: <PostEditor></PostEditor>
      },
      {
        path: "/:id/:title/edit",
        element: <PostEditor></PostEditor>
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
