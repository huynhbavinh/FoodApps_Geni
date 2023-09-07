import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import { TrustedTypeConfig } from "trusted-types";
import { useAuth } from "../../Context/AuthContext.jsx";
export function ProtectedRoute ({children}) {
    const navigate = useNavigate()
    // const fakeUserContext = {isAuthenticated: true}
    const {isAuthenticated, user} =  useAuth()
    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login')
        }
    }, [isAuthenticated, navigate])

    if (isAuthenticated) {
        return children;
    }
}

export function AdminProtectedRoute ({children}) {
    const navigate = useNavigate()
    // const fakeUserContext = {isAuthenticated: true}
    const {isAuthenticated, user} =  useAuth()
    //
    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login')
        }
    }, [isAuthenticated, navigate])

    if (user && user.data.roles[0] === 'ADMIN') {
        return children;
    }
}
