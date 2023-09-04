import { Outlet } from "react-router-dom"
import Header from './Header.jsx'
function AppLayout () {
    return (
        <>
            <Header/>
            <Outlet/>
        </>
    )
}

export default AppLayout;
