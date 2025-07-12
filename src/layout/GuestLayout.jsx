import { Outlet, useLocation } from "react-router-dom";
import AppHeader from "../components/AppHeader.jsx";
import AppFooter from "../components/AppFooter.jsx";

const GuestLayout = () => {
    const location = useLocation();
    const isHomePage = location.pathname === '/';
    return (
        <>
            <AppHeader isHomePage={isHomePage} />
            <Outlet />
            <AppFooter />
        </>
    )
}

export default GuestLayout ; 