import React from "react";

import styles from "./MealItem.module.css";

const MealItem = (props) => {
  const price = `$${props.meal.price.toFixed(2)}`;
  return (
    <li key={props.id} className={styles.meal}>
      <div>
        <h3>{props.meal.name}</h3>
        <div className={styles.description}>{props.meal.description}</div>
        <div className={styles.price}>{price}</div>
      </div>
      <div>
        <form>
          <div>1</div>
          <button>Add</button>
        </form>
      </div>
    </li>
  );
};

export default MealItem;
