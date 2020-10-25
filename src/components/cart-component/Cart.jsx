import React, { Component } from 'react';
import styles from './Cart.module.css'
import { Paper, Card,Button, CardContent,  TableContainer, Container, Table, TableBody, TableCell, TableHead,TableRow, Typography,} from '@material-ui/core';
import CartItem from './CartItem';
import { useContext } from 'react';
import { ContextApi } from './../context-component/DataCentral';
import CartTotal from './Cart_total';
import ShopDropdown from '../../components/shop-component/ShopDropdown';

const Cart = () => {
const {cart, handleClearCart} = useContext(ContextApi)
    return (
      <div className={styles.cartPage}>
        <Container maxWidth="lg" className={styles.cartContainer}>
          <Card className={styles.cartCard}>
            <CardContent>
              {cart.length == 0 ? (
                <Typography
                  className={styles.cardTitle}
                  color="textSecondary"
                  gutterBottom
                >
                  You have no item in your Cart
                </Typography>
              ) : (
                <Typography
                  className={styles.cardTitle}
                  color="textSecondary"
                  gutterBottom
                >
                  Your Cart
                </Typography>
              )}
            </CardContent>
          </Card>
          {cart.map((item) => (
            <CartItem key={item._id} item={item} />
          ))}
          <div className={styles.cart_total}>
            {cart.length == 0 ? null : <CartTotal />}
          </div>
        </Container>
        <ShopDropdown />
      </div>
    );
}
 
export default Cart;