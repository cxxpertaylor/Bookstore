//This file keeps track of all of the information about a cart, including what is in the cart and what functions a cart can do.
import { createContext, ReactNode, useContext, useState } from 'react';
import { CartItem } from '../types/CartItem';

interface CartContextType {
  cart: CartItem[]; //Array of all of the items in a cart
  //Define parameters for each of the cart functions:
  addToCart: (item: CartItem) => void; //adds a single CartItem to the cart
  removeFromCart: (bookID: number) => void; //removes a single item from the cart
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

//Make the CartProvider tag (see App.tsx)
export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]); //define what a cart is (an array of CartItems)

  //function to add an item to the cart
  const addToCart = (item: CartItem) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((c) => c.bookID === item.bookID);
      const updatedCart = prevCart.map((c) =>
        // c.bookID === item.bookID ? { ...c, price: c.price + item.price } : c This is what Hilton did.
        c.bookID === item.bookID ? { ...c, quantity: c.quantity + 1 } : c
      );
      return existingItem ? updatedCart : [...prevCart, item]; //if item already exists, return updatedCart, else add the item to the cart.
    });
  };

  //function to remove an item from the cart
  const removeFromCart = (bookID: number) => {
    setCart((prevCart) => prevCart.filter((c) => c.bookID !== bookID)); //pass in a bookID and set the cart equal to everything but the bookID that was passed in
  };

  //function to clear the cart
  const clearCart = () => {
    setCart(() => []); //set the cart equal to an empty array
  };

  return (
    //give these functions to the children of the provider in App.tsx
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

//export as useCart, which is like our own React Hook, so that we can use it to call all of these functions (addToCart, removeFromCart, clearCart)
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a Cart Provider');
  }
  return context;
};
