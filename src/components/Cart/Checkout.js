import React, { useRef, useState } from "react";

import styles from "./Checkout.module.css";

const isEmpty = (value) => value.trim() === "";
const isValidPostal = (value) => {
  const trimmedLength = value.trim().length;
  return trimmedLength === 5 || trimmedLength === 6;
};

const Checkout = (props) => {
  const [inputsValid, setInputsValid] = useState({
    name: true,
    street: true,
    city: true,
    postal: true
  });

  const nameRef = useRef();
  const streetRef = useRef();
  const postalRef = useRef();
  const cityRef = useRef();

  const confirmHandler = (event) => {
    event.preventDefault();

    const name = nameRef.current.value;
    const street = streetRef.current.value;
    const postal = postalRef.current.value;
    const city = cityRef.current.value;

    const nameIsValid = !isEmpty(name);
    const streetIsValid = !isEmpty(street);
    const postalIsValid = isValidPostal(postal);
    const cityIsValid = !isEmpty(city);

    setInputsValid({
      name: nameIsValid,
      street: streetIsValid,
      city: cityIsValid,
      postal: postalIsValid
    });

    console.log(inputsValid)

    const formIsValid =
      nameIsValid && streetIsValid && postalIsValid && cityIsValid;

    if (!formIsValid) {
      return;
    }

    props.onConfirm({
      name,
      street,
      postal,
      city
    });

  };

  const nameStyle = `${styles.control} ${inputsValid.name ? '' : styles.invalid}`;
  const streetStyle = `${styles.control} ${inputsValid.street ? '' : styles.invalid}`;
  const postalStyle = `${styles.control} ${inputsValid.postal ? '' : styles.invalid}`;
  const cityStyle = `${styles.control} ${inputsValid.city ? '' : styles.invalid}`;

  return (
    <form className={styles.form} onSubmit={confirmHandler}>
      <div className={nameStyle}>
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" ref={nameRef} />
        {!inputsValid.name && <p>Please enter a valid name!</p>}
      </div>
      <div className={streetStyle}>
        <label htmlFor="street">Street</label>
        <input type="text" id="street" ref={streetRef} />
        {!inputsValid.street && <p>Please enter a valid street!</p>}
      </div>
      <div className={postalStyle}>
        <label htmlFor="postal">Postal Code</label>
        <input type="text" id="postal" ref={postalRef} />
        {!inputsValid.postal && <p>Please enter a valid postal code!</p>}
      </div>
      <div className={cityStyle}>
        <label htmlFor="city">City</label>
        <input type="text" id="city" ref={cityRef} />
        {!inputsValid.city && <p>Please enter a valid city!</p>}
      </div>
      <div className={styles.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={styles.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
