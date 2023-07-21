import React, { useRef, useState } from "react";

import Input from "../../UI/Input";

import styles from "./MealItemForm.module.css";

const MealItemForm = (props) => {
  const [entryIsValid, setEntryIsValid] = useState(true);

  const inputRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();

    const entry = inputRef.current.value;
    const amount = +entry;

    if (entry.trim().length === 0 || amount < 1 || amount > 5) {
      setEntryIsValid(false);
      return;
    }

    props.onAddToCart(amount);
  };

  return (
    <form className={styles.form} onSubmit={submitHandler}>
      <Input
        ref={inputRef}
        label="Amount"
        input={{
          id: "amount_" + props.id,
          type: "number",
          min: "1",
          max: "5",
          step: "1",
          defaultValue: "1",
        }}
      />
      <button>+ Add</button>
      {!entryIsValid && <p>Please enter a valid amount (1 to 5)</p>}
    </form>
  );
};

export default MealItemForm;
