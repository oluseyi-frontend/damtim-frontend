import React, { Component, useState, useContext } from 'react';
import styles from './Payment.module.css'
import { Container, Card, CardContent, Button, CardActions, Typography } from '@material-ui/core';
import  axios  from 'axios';
import {  Redirect, useLocation } from 'react-router';
import { useHistory, Route, Link } from "react-router-dom";
import PaymentIcon from "@material-ui/icons/Payment";
import { ContextApi } from './../context-component/DataCentral';

const PaymentPage = ({ match }) => {
const {cart, currentUser} = useContext(ContextApi)

   const addOrderIdToLs = () => {
    
     localStorage.setItem("damtim order-id", match.params.id)
   };

  const handlePayment = (e) => {
    addOrderIdToLs()
    e.preventDefault()
    axios
      .post("https://damtim-api.herokuapp.com/damtim/api/pay", {
        full_name: currentUser.first_name + currentUser.last_name,
        amount: match.params.orderSummaryTotal,
        email: currentUser.email,
      })

      .then((data) => {
        window.location.href = data.data;
      })
      .catch((err) => {
        console.log(err);
      });
}

    return (
      <div className={styles.payment_page}>
        <Container maxWidth="sm" className={styles.container}>
          <Card className={styles.my_details_card}>
            <CardContent className={styles.details_card_content}>
              <Typography gutterBottom>Transaction Summary</Typography>
              {cart.map((item) => {
                return (
                  <div key={item._id} className={styles.item_details}>
                    <img src={item.image} alt="" />
                    <Typography gutterBottom>{item.name}</Typography>
                  </div>
                );
              })}
              <div className={styles.total_fee}>
                <Typography gutterBottom>
                  Total Including Tax and Shiping fee:
                </Typography>
                <Typography gutterBottom>
                  {match.params.orderSummaryTotal}
                </Typography>
              </div>
            </CardContent>
            <CardActions className={styles.details_card_actions}>
              <Link to="/cart">
                <Button size="small">Edit Cart</Button>
              </Link>
            </CardActions>
          </Card>

          <Card className={styles.my_card}>
            <CardContent className={styles.card_content}>
              <Typography gutterBottom>Select Payment Method</Typography>
            </CardContent>
            <CardActions className={styles.card_actions}>
              <div className={styles.paystack}>
                <Button size="small" onClick={handlePayment}>
                  <PaymentIcon />
                </Button>
                <Typography gutterBottom>Paystack</Typography>
              </div>
              <div className={styles.paypal}>
                <Button size="small" onClick={handlePayment}>
                  <PaymentIcon />
                </Button>
                <Typography gutterBottom>Paypal</Typography>
              </div>
            </CardActions>
          </Card>
        </Container>
      </div>
    );
}
 
export default PaymentPage;