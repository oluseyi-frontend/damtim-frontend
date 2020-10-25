import React, { Component, useEffect } from 'react';
import { Card, Typography, Divider, CardContent,  } from '@material-ui/core';
import styles from './Checkout.module.css'
import { useContext } from 'react';
import { ContextApi } from './../context-component/DataCentral';

const OrderSummary = ({shippingFee, orderSummaryTotal}) => {
    const {cart, subtotal, tax, total} = useContext(ContextApi)
    return (
      <Card className={styles.my_card}>
        <CardContent>
          <Typography
            className={styles.title}
            color="textSecondary"
            gutterBottom
          >
            Order Summary
          </Typography>
          {cart.map((item) => {
            return (
              <div key={item._id} className={styles.item_details}>
                <img src={item.image} alt="" />
                <Typography color="textSecondary">{item.total}</Typography>
              </div>
            );
          })}
          <Divider className={styles.my_divider} />
          <div className={styles.subtotal}>
            <Typography color="textSecondary">Subtotal:</Typography>
            <Typography color="textSecondary">{total}</Typography>
          </div>
          <div className={styles.shipping}>
            <Typography color="textSecondary">Shipping:</Typography>
            <Typography color="textSecondary">{shippingFee}</Typography>
          </div>

          <Divider className={styles.my_divider} />
          <div className={styles.total}>
            <Typography color="textSecondary">Total:</Typography>
            <Typography color="textSecondary">{orderSummaryTotal}</Typography>
          </div>
        </CardContent>
      </Card>
    );
}
 
export default OrderSummary;