import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/homes/Home";
import Login from "../components/Login";
import Register from "../components/Register";
import CartPage from "../pages/plants/CartPage";  // Changed to CartPage for plants
import CheckoutPage from "../pages/plants/CheckoutPage";  // Changed to CheckoutPage for plants
import SinglePlant from "../pages/plants/SinglePlant";  // Changed to SinglePlant
import PrivateRoute from "./PrivateRoute";
import OrderPage from "../pages/plants/OrderPage";  // Changed to OrderPage for plants
import AdminRoute from "./AdminRoute";
import AdminLogin from "../components/AdminLogin";
import DashboardLayout from "../pages/dashboard/DashboardLayout";
import Dashboard from "../pages/dashboard/Dashboard";
import ManagePlants from "../pages/dashboard/managePlants/ManagePlants";  // Changed to ManagePlants
import AddPlant from "../pages/dashboard/addPlant/AddPlant";  // Changed to AddPlant
import UpdatePlant from "../pages/dashboard/editPlant/UpdatePlant";  // Changed to UpdatePlant

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/orders",
                element: <PrivateRoute><OrderPage /></PrivateRoute>,
            },
            {
                path: "/about",
                element: <div>About</div>,
            },
            {
                path: "/login",
                element: <Login />,
            },
            {
                path: "/register",
                element: <Register />,
            },
            {
                path: "/cart",
                element: <CartPage />,
            },
            {
                path: "/checkout",
                element: <PrivateRoute><CheckoutPage /></PrivateRoute>,
            },
            {
                path: "/plants/:id",
                element: <SinglePlant />,  // Changed to SinglePlant
            }
        ]
    },
    {
        path: "/admin",
        element: <AdminLogin />,
    },
    {
        path: "/dashboard",
        element: <AdminRoute><DashboardLayout /></AdminRoute>,
        children: [
            {
                path: '',
                element: <AdminRoute><Dashboard /></AdminRoute>,
            },
            {
                path: "add-new-plant",  // Changed to AddPlant
                element: <AdminRoute><AddPlant /></AdminRoute>,
            },
            {
                path: "edit-plant/:id",  // Changed to UpdatePlant
                element: <AdminRoute><UpdatePlant /></AdminRoute>,
            },
            {
                path: "manage-plants",  // Changed to ManagePlants
                element: <AdminRoute><ManagePlants /></AdminRoute>,
            }
        ]
    }
]);

export default router;
