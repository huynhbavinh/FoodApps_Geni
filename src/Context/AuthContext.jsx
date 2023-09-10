import axios from "axios";
import { createContext, useContext, useReducer, useState } from "react";

const AuthContext = createContext();

const reducer = (state, action) => {
    const actionType = action.type;
    let result;
    if (actionType === 'login') {
        // todo: change password to token
        const userInfo = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : false
        result = {...state,
            isAuthenticated: userInfo ? true : false,
            user: userInfo ? userInfo : action.payload.user
        }
    }

    if (actionType === 'logout') {
        result = {...initialState, isAuthenticated: false}
    }

    if (actionType === 'reject') {
        result = {...state, isAuthenticated: false, error: 'Reject'}
    }
    return result;
}

const initialState = {
    id: '1',
};

const AuthProvider  = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState)
    let {user, isAuthenticated, error} = state;
    const [totalCart, setTotalCart] = useState(0);
    let flags = 0
    async function login (userName, password) {
        try {
            const userLoginInfo = {
                userName,
                password
            };
            const loginInfo = await axios.post('http://localhost:8080/auth/signin', userLoginInfo)
            dispatch({type: 'login', payload: {user: loginInfo}})
            localStorage.setItem('user', JSON.stringify(loginInfo))

            return {
                isAdmin: loginInfo.data.roles[0] === 'ADMIN'
            }
        } catch (error) {
            dispatch({type: 'reject'})
        }
    }
    function logout () {
        dispatch({type: 'logout'});
        localStorage.clear()
    }
    return (
        <AuthContext.Provider value={{user, isAuthenticated, login, logout, error, totalCart, setTotalCart }}>
            {children}
        </AuthContext.Provider>
        
    )
}

const useAuth = () => {
    const context = useContext(AuthContext);
    return context;
}

export {useAuth, AuthProvider}