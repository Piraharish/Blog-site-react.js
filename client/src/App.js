import { createBrowserRouter, RouterProvider,// Route,
Outlet, } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Write from "./pages/Write";
import Home from "./pages/Home";
import Draft from "./pages/Drafts";
import MyPost from "./pages/MyPosts";
import Editdraft from "./pages/Editdrafts";
import Single from "./pages/Single";
import Userprofile from "./pages/Userprofile";
import Profile from "./pages/Profile";
import Editprofile from "./pages/Editprofile";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import "./style.scss"

const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
     
      {
        path: "/post/:id",
        element: <Single />,
      },
      {
        path: "/write",
        element: <Write />,
      },
      {
        path: "/drafts",
        element: <Draft />,
      },
      {
        path: "/edit-draft/:id",
        element: <Editdraft />,
      },
      {
        path: "/myPosts",
        element: <MyPost />,
      },
      {
        path: "/profile",
        element: <Userprofile />,
      },
      {
        path: "/profile/:username",
        element: <Profile />,
      },
      {
        path: "/edit-profile",
        element: <Editprofile />,
      },
    ],
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

function App() {
  return (
    <div className="app">
      <div className="container">
        <RouterProvider router={router} />
      </div>
    </div>
  );
}

export default App;
