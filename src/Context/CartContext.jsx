import axios from 'axios';

import {createContext, useContext, useState} from 'react';

const CartContext = createContext();


const initialState = {};

const CartProvider = ({children}) => {
    const [totalMoney, setTotalMoney] = useState(0);
    const [carts, setCart] = useState(0);

    return (
        <CartContext.Provider value={{totalMoney, setTotalMoney, carts, setCart}}>
            {children}
        </CartContext.Provider>
    )
};

const useCart = () => {
    const context = useContext(CartContext);
    return context;
}

export {useCart, CartProvider}