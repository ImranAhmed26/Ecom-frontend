import React, { createContext, useEffect, useReducer, useState } from "react";

const initialState = { cart: [] };

export const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      if (state.cart.find((item) => item.id === action.payload.id)) {
        return {
          ...state,
          cart: state.cart.map((item) =>
            item.id === action.payload.id ? { ...item, quantity: item.quantity + 1 } : item,
          ),
        };
      } else {
        // otherwise, add new item to cart
        return {
          ...state,
          cart: [...state.cart, { ...action.payload, quantity: 1 }],
        };
      }
    case "REMOVE_FROM_CART": {
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.payload),
      };
    }
    case "INCREMENT_QUANTITY": {
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.id === action.payload ? { ...item, quantity: item.quantity + 1 } : item,
        ),
      };
    }
    case "DECREMENT_QUANTITY": {
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.id === action.payload && item.quantity > 1
            ? { ...item, quantity: item.quantity - 1 }
            : item,
        ),
      };
    }
    case "CLEAR_CART": {
      return {
        ...state,
        cart: [],
      };
    }
    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const [totalPrice, setTotalPrice] = useState(0);

  const calculateTotalPrice = () => {
    const totalPrice = state.cart.reduce((acc, item) => acc + item.unitPrice * item.quantity, 0);
    setTotalPrice(totalPrice);
  };

  useEffect(() => {
    calculateTotalPrice();
  }, [state.cart]);

  // useEffect(() => {
  //   const savedCart = localStorage.getItem("cart");
  //   console.log("SAV", savedCart);
  //   if (savedCart) dispatch({ type: "ADD_TO_CART", payload: [...JSON.parse(savedCart)] });
  // }, []);

  const addToCart = (product) => {
    dispatch({ type: "ADD_TO_CART", payload: product });
  };

  const removeFromCart = (productId) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: productId });
  };

  const incrementQuantity = (productId) => {
    dispatch({ type: "INCREMENT_QUANTITY", payload: productId });
  };

  const decrementQuantity = (productId) => {
    dispatch({ type: "DECREMENT_QUANTITY", payload: productId });
  };

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };

  return (
    <CartContext.Provider
      value={{
        cart: state.cart,
        addToCart,
        removeFromCart,
        incrementQuantity,
        decrementQuantity,
        clearCart,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
