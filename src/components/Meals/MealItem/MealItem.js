import React, { useContext } from "react";

import MealItemForm from "./MealItemForm";
import CartContext from "../../../store/cart-context";

import styles from "./MealItem.module.css";

const MealItem = (props) => {
  const cartCtx = useContext(CartContext);

  const price = `$${props.meal.price.toFixed(2)}`;

  const addItem = (amount) => {
    cartCtx.addItem( {
      ...props.meal,
      amount: amount
    })
  };
  
  return (
    <li className={styles.meal}>
      <div>
        <h3>{props.meal.name}</h3>
        <div className={styles.description}>{props.meal.description}</div>
        <div className={styles.price}>{price}</div>
      </div>
      <div>
        <MealItemForm id = {props.meal.id} onAddToCart = {addItem}/>
      </div>
    </li>
  );
};

export default MealItem;
