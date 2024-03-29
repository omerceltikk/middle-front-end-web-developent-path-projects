import { useState,createContext, useEffect, useContext } from "react";

const BasketContext = createContext()

const defaultBasket = JSON.parse(localStorage.getItem("basket")) || []

const BasketProvider = ({children}) => {
    const [items,setItems] = useState(defaultBasket)
    useEffect(() => {
        localStorage.setItem("basket", JSON.stringify(items))
    },[items])

    const addToBasket = (data, findBasketItem) => {
        if(!findBasketItem){
            return setItems((items) => [...items,data]);
        }
        const filtered = items.filter((item) => item._id !== findBasketItem._id)
        setItems(filtered)
    };

    const removeFromBasket = (item_id) => {
        const filtered = items.filter((item) => item._id !== item_id)
        setItems(filtered)
    }
    const nullBasket = () => setItems([]);

    const values = {
        items,
        setItems,
        addToBasket,
        removeFromBasket,
        nullBasket
    }

    return (
    <BasketContext.Provider value={values}>{children}</BasketContext.Provider>
    );

    };
    const useBasket = () => useContext(BasketContext)

    export {BasketProvider, useBasket}

