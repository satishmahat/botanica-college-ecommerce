import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/homes/Home";
import Login from "../components/Login";
import Register from "../components/Register";
import CartPage from "../pages/plants/CartPage";
import CheckoutPage from "../pages/plants/CheckoutPage";
import PaymentCallback from "../pages/plants/PaymentCallback"; // NEW: Payment callback component
import SinglePlant from "../pages/plants/SinglePlant";
import PrivateRoute from "./PrivateRoute";
import OrderPage from "../pages/plants/OrderPage";
import AdminRoute from "./AdminRoute";
import AdminLogin from "../components/AdminLogin";
import DashboardLayout from "../pages/dashboard/DashboardLayout";
import Dashboard from "../pages/dashboard/Dashboard";
import ManagePlants from "../pages/dashboard/managePlants/ManagePlants";
import AddPlant from "../pages/dashboard/addPlant/AddPlant";
import UpdatePlant from "../pages/dashboard/editPlant/UpdatePlant";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            { path: "/", element: <Home /> },
            { path: "/orders", element: <PrivateRoute><OrderPage /></PrivateRoute> },
            { path: "/about", element: <div>About</div> },
            { path: "/login", element: <Login /> },
            { path: "/register", element: <Register /> },
            { path: "/cart", element: <CartPage /> },
            { path: "/checkout", element: <PrivateRoute><CheckoutPage /></PrivateRoute> },
            { path: "/payment-callback", element: <PaymentCallback /> }, // NEW ROUTE for Khalti callback\n            { path: "/plants/:id", element: <SinglePlant /> }
        ]
    },
    { path: "/admin", element: <AdminLogin /> },
    {
        path: "/dashboard",
        element: <AdminRoute><DashboardLayout /></AdminRoute>,
        children: [
            { path: "", element: <AdminRoute><Dashboard /></AdminRoute> },
            { path: "add-new-plant", element: <AdminRoute><AddPlant /></AdminRoute> },
            { path: "edit-plant/:id", element: <AdminRoute><UpdatePlant /></AdminRoute> },
            { path: "manage-plants", element: <AdminRoute><ManagePlants /></AdminRoute> }
        ]
    }
]);

export default router;
