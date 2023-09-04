import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import { TrustedTypeConfig } from "trusted-types";

function ProtectedRoute ({children}) {
    const navigate = useNavigate()
    const fakeUserContext = {isAuthenticated: true}
    const {isAuthenticated} =  fakeUserContext;
    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login')
        }
    }, [isAuthenticated, navigate])

    if (isAuthenticated) {
        return children;
    }
}

export default ProtectedRoute;