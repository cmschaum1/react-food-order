import React from "react";

import styles from "./Cart.module.css";
import Modal from "../UI/Modal";

const Cart = (props) => {
  const cartItems = (
    <ul className={styles["cart-items"]}>
      {[{ id: "c1", name: "Sushi", amount: 2, price: 12.99 }].map((iteam) => (
        <li>{iteam.name}</li>
      ))}
    </ul>
  );

  return (
    <Modal onHideCart={props.onHideCart}>
      {cartItems}
      <div className={styles.total}>
        <span>Total Amount</span>
        <span>36.55</span>
      </div> 
      <div className={styles.actions}>
        <button className={styles['button-alt']} onClick={props.onHideCart}>Close</button>
        <button className={styles.button} onClick={props.onHideCart}>Order</button>
      </div>
    </Modal>
  )
};

export default Cart;
