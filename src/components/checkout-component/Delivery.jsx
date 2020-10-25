import React, { Component } from 'react';
import { RadioGroup, FormControlLabel, Radio,  } from '@material-ui/core';
import styles from './Checkout.module.css'
const Delivery = ({value, handleChange2}) => {
    
    return (
      <form action="" className={styles.form}>
        <RadioGroup
          aria-label="gender"
          name="gender1"
          value={value}
          onChange={handleChange2}
        >
          <FormControlLabel
            name="delivery"
            value="Door delivery"
            control={<Radio />}
            label="door delivery"
          />
          <FormControlLabel
         
            name="delivery"
            value="pick up delivery"
            control={<Radio />}
            label="pick up delivery"
          />
        </RadioGroup>
      </form>
    );
}
 
export default Delivery;