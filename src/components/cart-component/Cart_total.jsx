import React, { Component, useContext } from 'react';
import styles from './Cart.module.css'
import { CardContent, Card, Typography, Button } from '@material-ui/core';
import { ContextApi } from './../context-component/DataCentral';
import { Link } from 'react-router-dom';


const CartTotal = () => {

    const { subtotal, cart, handleClearCart,  tax, total } = useContext(ContextApi)
    
    return (
      <div className={styles.cartTotal}>
        {cart.length < 2 ? null : (
          <Button
            onClick={() => {
              handleClearCart();
            }}
            variant="contained"
            color="secondary"
          >
            Clear Cart
          </Button>
        )}
        <Card className={styles.summary_card}>
          <CardContent>
            <div className={styles.sub_total}>
              <Typography
                className={styles.cardTitle}
                color="textSecondary"
                gutterBottom
              >
                Subtotal:
              </Typography>

              <Typography
                className={styles.cardTitle}
                color="textSecondary"
                gutterBottom
              >
                {subtotal}
              </Typography>
            </div>
            <div className={styles.tax}>
              <Typography
                className={styles.cardTitle}
                color="textSecondary"
                gutterBottom
              >
                Tax:
              </Typography>

              <Typography
                className={styles.cardTitle}
                color="textSecondary"
                gutterBottom
              >
                {tax}
              </Typography>
            </div>
            <div className={styles.total}>
              <Typography
                className={styles.cardTitle}
                color="textSecondary"
                gutterBottom
              >
                Total:
              </Typography>

              <Typography
                className={styles.cardTitle}
                color="textSecondary"
                gutterBottom
              >
                {total}
              </Typography>
            </div>

            <Link to="/checkout">
              <Button variant="contained" color="primary">
                Checkout
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
}
 
export default CartTotal;