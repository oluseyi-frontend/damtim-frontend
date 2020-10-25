import React, { Component } from 'react';
import { RadioGroup, FormControlLabel, Radio } from "@material-ui/core";
import styles from "./Checkout.module.css";


const Payment = ({value2, handleChange3}) => {
    return (
      <form action="" className={styles.form}>
        <RadioGroup
          aria-label="Payment"
          name="payment"
          value={value2}
          onChange={handleChange3}
        >
          <FormControlLabel
            name="payment"
            value="bank transfer"
            control={<Radio />}
            label="bank transfer"
          />
          <FormControlLabel
            name="payment"
            value="card transaction"
            control={<Radio />}
            label="card transaction"
          />
        </RadioGroup>
      </form>
    );
}
 
export default Payment;