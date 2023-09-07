import { Outlet } from "react-router-dom"
import Header from "./Header.jsx"
import Footer from "./Footer.jsx"

export function AppLayout () {
    return (
        <>
            <Header/>
            <Outlet/>
            <Footer/>
        </>
    )
}

export function AdminLayout () {
    return (
        <>
            <Outlet/>
        </>
    )
}