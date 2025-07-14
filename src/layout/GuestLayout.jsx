import { Outlet, useLocation } from "react-router-dom";
import AppHeader from "../components/AppHeader.jsx";
import AppFooter from "../components/AppFooter.jsx";
import { CartProvider } from "../Context/CartContext.jsx";

const GuestLayout = () => {
    const location = useLocation();
    const isHomePage = location.pathname === '/';
    return (
        <>
            <CartProvider>
            <AppHeader isHomePage={isHomePage} />
            <Outlet />
            <AppFooter />
            </CartProvider>
        </>
    )
}

export default GuestLayout ; 