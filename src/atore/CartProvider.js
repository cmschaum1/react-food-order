import { useReducer } from "react";

import CartContext from "./cart-context";

const ADD_ACTION = "ADD_ACTION";
const REMOVE_ACTION = "REMOVE_ACTION";

const defaultState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  if (action.type === ADD_ACTION) {
    const updatedItems = state.items.concat(action.item);
    const updatedAmount =
      state.totalAmount + action.item.price * action.item.amount;
    return {
      items: updatedItems,
      totalAmount: updatedAmount,
    };
  } else if (action.type === REMOVE_ACTION) {
    //remove;
  }

  return defaultState;
};

const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultState);

  const AddItem = (item) => {
    dispatchCartAction({ type: ADD_ACTION, item: item });
  };

  const RemoveItem = (id) => {
    dispatchCartAction({ type: REMOVE_ACTION, id: id });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: AddItem,
    removeItem: RemoveItem,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
