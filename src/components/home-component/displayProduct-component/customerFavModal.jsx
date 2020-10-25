import React, { useState, useContext, useEffect } from "react";
import styles from "./CustomerFav.module.css";
import {
  Typography,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
    DialogContent,
  IconButton,
    Container
  
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { Link } from "react-router-dom";

const CustomerFavModal = ({
  handleClose,
  open,
  currentCake,
 
}) => {
 

 

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={open}
    >
      <div className={styles.modalTitle}>
        <DialogTitle
          id="customized-dialog-title"
          className={styles.name}
          onClose={handleClose}
        >
          <Typography>{currentCake.name}</Typography>
        </DialogTitle>
        <IconButton
          aria-label="close"
          className={styles.close}
          onClick={handleClose}
        >
          <CloseIcon />
        </IconButton>
      </div>
      <DialogContent dividers className={styles.dialogContent}>
        <img src={currentCake.image} alt="" />
      </DialogContent>
      <DialogActions className={styles.dialogActions}>
        <Button variant="contained" onClick={handleClose} color="primary">
          Continue
        </Button>
        <Link to="/cart">
          <Button
            autoFocus
            onClick={handleClose}
            variant="contained"
            color="primary"
          >
            To Cart
          </Button>
        </Link>
      </DialogActions>
    </Dialog>
  );
};

export default CustomerFavModal;
