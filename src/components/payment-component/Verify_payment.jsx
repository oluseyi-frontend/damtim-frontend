import React, { Component, useEffect, useState, useContext } from 'react';
import styles from "./Payment.module.css";
import { Container, Dialog, DialogContent, DialogTitle, Button, DialogActions, DialogContentText, Typography } from "@material-ui/core";
import axios from "axios";
import { ContextApi } from './../context-component/DataCentral';
import { useHistory } from 'react-router';


const VerifyPayment = ({ location, match }) => {
const history = useHistory()
  const [message, setMessage] = useState('')
  const [open, setOpen] = React.useState(false);
const {orderId, handleClearCart} = useContext(ContextApi)
  const [id, setId] = useState('')
  

  useEffect(() => {
    setId(localStorage.getItem('damtim order-id'));
  })


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    history.push('/')
    handleClearCart()
  };
  useEffect(() => {
      console.log(id)
        axios
          .get(
            `https://damtim-api.herokuapp.com/damtim/api/paystack/callback${location.search}`
          )
          .then((data) => {
            console.log(data.data);
            console.log(data.data.message);
            setMessage(data.data.message);
            handleClickOpen();
            axios
              .patch(`https://damtim-api.herokuapp.com/damtim/api/orders/${id}`)
              .then((data) => {
                console.log(data);
              })
              .catch((error) => {
                console.log(error);
              });
          })
          .catch((err) => {
            console.log(err)
            handleClickOpen();
            setMessage("please try again");
          });
    }, [id])


    return (
      <div className={styles.verify}>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          className={styles.my_dialog}
        >
          <DialogTitle id="alert-dialog-title">
            {"Verification of Payment"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {message}
            </DialogContentText>
            <Typography></Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Okay
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
}
 
export default VerifyPayment;