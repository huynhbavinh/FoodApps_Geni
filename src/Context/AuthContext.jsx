import axios from "axios";
import { createContext, useContext, useReducer } from "react";

const AuthContext = createContext();

const reducer = (state, action) => {
    const actionType = action.type;
    let result;
    if (actionType === 'login') {
        result = {...state, isAuthenticated: true, user: action.payload.user}
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
    const {user, isAuthenticated} = state;
    async function login (userName, password) {
        try {
            const userLoginInfo = {
                userName,
                password
            };
            const loginInfo = await axios('http://localhost:8080/auth/signin', userLoginInfo)
            dispatch({type: 'login', payload: {user: loginInfo}})
        } catch (error) {
            console.log('Do something with the error')
        }
    }
    function logout () {
        console.log('logout')
    }
    return (
        <AuthContext.Provider value={{user, isAuthenticated, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}

const useAuth = () => {
    const context = useContext(AuthContext);
    return context;
}
export {useAuth, AuthProvider}