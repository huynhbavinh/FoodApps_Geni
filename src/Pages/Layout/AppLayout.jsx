import { Outlet } from "react-router-dom"
import Header from "./Header.jsx"
import Footer from "./Footer.jsx"

function AppLayout () {
    return (
        <>
            <Header/>
            <Outlet/>
            <Footer/>
        </>
    )
}
export default AppLayout;