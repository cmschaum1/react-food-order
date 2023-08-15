import React, { Fragment, useContext, useState } from "react";

import config from "../../store/config";

import Modal from "../UI/Modal";
import CartItem from "./CartItem";
import Checkout from "./Checkout";

import CartContext from "../../store/cart-context";

import styles from "./Cart.module.css";

const Cart = (props) => {
  const cartCtx = useContext(CartContext);
  const [isCheckout, setIsCheckout] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitOk, setSubmitOk] = useState(false);

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const removeItem = (id) => {
    cartCtx.removeItem(id);
  };

  const addItem = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const orderHandler = (event) => {
    setIsCheckout(true);
  };

  const confirmHandler = async (userData) => {
    setIsSubmitting(true);
    await fetch(config.url + "orders.json", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user: userData,
        items: cartCtx.items,
      }),
    });
    setIsSubmitting(true);
    setSubmitOk(true);
    cartCtx.clearCart();
  };

  const cartItems = (
    <ul className={styles["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onAdd={addItem.bind(null, item)}
          onRemove={removeItem.bind(null, item.id)}
        />
      ))}
    </ul>
  );

  const modalActions = (
    <div className={styles.actions}>
      <button className={styles["button--alt"]} onClick={props.onHideCart}>
        Close
      </button>
      {hasItems && (
        <button className={styles.button} onClick={orderHandler}>
          Order
        </button>
      )}
    </div>
  );

  const cartModalContent = (
    <Fragment>
      {cartItems}
      <div className={styles.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckout && (
        <Checkout onConfirm={confirmHandler} onCancel={props.onHideCart} />
      )}
      {!isCheckout && modalActions}
    </Fragment>
  );

  const submittingContent = <p>Sending order data...</p>;

  const didSubmit = <p>Successfully sent order data!</p>;

  return (
    <Modal onHideCart={props.onHideCart}>
      {isSubmitting
        ? submittingContent
        : submitOk
        ? didSubmit
        : cartModalContent}
    </Modal>
  );
};

export default Cart;
