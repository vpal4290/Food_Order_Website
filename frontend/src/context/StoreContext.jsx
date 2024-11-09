
import { createContext, useEffect, useState } from "react";
import axios from 'axios';
import { food_list } from "../assets/assets";

export const StoreContext = createContext();

const StoreContextProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]); // Initialize as an array
    const [food_list, setFoodList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [token, setToken] = useState("");
    const validPromoCodes = { 'FOODE25': 20 ,'FOODE10':10};
    const [isPromoCodeValid, setIsPromoCodeValid] = useState(false);
    const [discount, setDiscount] = useState(0);
    const url = "http://localhost:4000";
    const aurl="http://localhost:5174";
    // useEffect(() => {
    //     const loadData = async () => {
    //         await fetchFoodList();
    //         const storedToken = localStorage.getItem("token");
    //         if (storedToken) {
    //             setToken(storedToken);
    //             await loadCartData(storedToken);

    //         }
    //     };
    //     loadData();
    // }, []);
    useEffect(() => {
        const loadData = async () => {
          try {
            
            const storedToken = localStorage.getItem("token");
            if (storedToken) {
              setToken(storedToken);
              await fetchFoodList();
              await loadCartData(storedToken);
              setLoading(false);
            }
          } catch (error) {
            console.error("Error loading data:", error);
            // Handle error here, such as displaying an error message
          } finally {
            setLoading(false); // Set loading to false whether success or error
          }
        };
      
        loadData();
      }, []);
    console.log(cartItems)

    const addtoCart = async (itemId) => {
        setCartItems((prev) => {
            const cartItem = prev.find((item) => item.name === itemId);
            if (cartItem) {
                return prev.map((item) =>
                    item.name === itemId ? { ...item, quantity: item.quantity + 1 } : item
                );
            } else {
                return [...prev, { name: itemId, quantity: 1 }];
            }
        });

        if (token) {
            await axios.post(`${url}/cart/add`, { itemId }, { headers: { token } });
        }
    };
    const calculateDiscountedTotal = () => {
        const subtotal = gettotalCartAmount();
        if (isPromoCodeValid) {
          return subtotal - (subtotal * discount / 100);
        }
        return subtotal;
      };
    // console.log(cartItems)

    // const removeFromCart = async (itemId) => {
    //     setCartItems((prev = []) => { // Default value to ensure prev is always an array
    //         const existingItem = prev.find((item) => item.id === itemId);
    //         console.log(existingItem)
    //         if (existingItem) {
    //             if (existingItem.quantity > 1) {
    //                 return prev.map((item) =>
    //                     item.id === itemId ? { ...item, quantity: item.quantity - 1 } : item
    //                 );
    //             } else {
    //                 return prev.filter((item) => item.id !== itemId);
    //             }
    //         } else {
    //             return prev;
    //         }
    //     });

    //     if (token) {
    //         await axios.post(`${url}/cart/remove`, { itemId }, { headers: { token } });
    //     }
    // };
    const removeFromCart = async (itemId) => {
        console.log(itemId)
        setCartItems((prev = []) => {
            const existingItem = prev.find((item) => item.name === itemId);
            if (existingItem) {
                if (existingItem.quantity > 1) {
                    return prev.map((item) =>
                        item.name === itemId ? { ...item, quantity: item.quantity - 1 } : item
                    );
                } else {
                    return prev.filter((item) => item.name !== itemId);
                }
            } else {
                return prev;
            }
        });

        if (token) {
            await axios.post(`${url}/cart/remove`, { itemId }, { headers: { token } });
        }
    };




    // const gettotalCartAmount = () => {
    //     let totalAmount = 0;
    //     for (const item of cartItems) {
    //         console.log()
    //         const itemInfo = food_list.find((product) => product.id === item.id);
    //         if (itemInfo) {
    //             totalAmount += itemInfo.price * item.quantity;
    //         } else {
    //             console.error(`Item with ID ${item.id} not found in foodList.`);
    //         }
    //     }
    //     console.log(`Total Cart Amount: ${totalAmount}`);
    //     return totalAmount;
    // };
    const gettotalCartAmount = () => {
        let totalAmount = 0;
        console.log(food_list)

        console.log(cartItems)
        for (const item of cartItems) {
            console.log(item)
            const itemInfo = food_list.find((product) => product.name === item.name);
            if (itemInfo) {
                totalAmount += itemInfo.price * item.quantity;
            } 
            else {
                console.error(`Item with ID ${item.name} not found in foodList.`);
            }
        }
        console.log(`Total Cart Amount: ${totalAmount}`);
        return totalAmount;
    };

    const fetchFoodList = async () => {
        try {
            const response = await axios.get(`${url}/food/list`);
            setFoodList(response.data.data);
            setLoading(false)
        } catch (err) {
            console.log(err);
            setLoading(false)

        }
    };

    const loadCartData = async (token) => {
        try {
            const response = await axios.get(`${url}/cart/getcart`, { headers: { token } });
            const cartData = response.data.cartData;
            // console.log(cartData);

            // Convert the cart data to an array of objects
            const cartItemsArray = Object.entries(cartData).map(([name, quantity]) => ({
                name,
                quantity
            }));
            console.log(cartItemsArray);

            setCartItems(cartItemsArray);
            setLoading(false)
        } catch (error) {
            console.error('Failed to load cart data:', error);
            setLoading(false)
        }
    };


    const deliveryFee = () => {
        return cartItems.length > 0 ? 5 : 0;
    };

    const contextValue = {
        food_list,
        cartItems,
        setCartItems,
        addtoCart,
        removeFromCart,
        gettotalCartAmount,
        deliveryFee,
        url,
        token,
        setToken,
        loading,
        calculateDiscountedTotal
    };

    return (
        <StoreContext.Provider value={contextValue}>
            {children}
        </StoreContext.Provider>
    );
};

export default StoreContextProvider;