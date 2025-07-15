import { createContext, useContext, useState, useEffect } from "react";

const WishListContext = createContext();

export const WishListProvider = ({children}) => {
    const [wishList, setWishList] = useState([]);
    const [isWishListOpen, setIsWishListOpen] = useState(false)

    // Caricamento dal localStorage
    useEffect(() => {
        const stored = localStorage.getItem("wishList");
        if (stored) {
            setWishList(JSON.parse(stored));
        }
        setIsWishListOpen(true);
    
    }, []);

    // Salva il wishList nel localStorage
    useEffect(() => {
        localStorage.setItem("wishList", JSON.stringify(wishList));
    }, [wishList]);

    const addToWishList = (product) => {
        setWishList((prev) => {
            const existing = prev.find((item) => item.id === product.id);
            if (existing) {
                return prev.map((item) =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + product.quantity }
                        : item
                );
            } else {
                return [...prev, product];

            }
        });
    };

    const removeFromWishList = (id) => {
        setWishList((prev) => prev.filter((item) => item.id !== id));
    };

    const clearWishList = () => {
        setWishList([]);
    };

    return (
        <WishListContext.Provider
            value={{ wishList, addToWishList, removeFromWishList, clearWishList, isWishListOpen, setIsWishListOpen }}
        >
            {children}
        </WishListContext.Provider>
    );
};

export const useWishList = () => useContext(WishListContext);

export const useWishListItems = () => {
    const { wishList } = useWishList();
    return wishList;
}