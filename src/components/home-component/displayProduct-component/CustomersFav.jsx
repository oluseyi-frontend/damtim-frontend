import React, { useState, useContext, useEffect } from "react";
import styles from "./CustomerFav.module.css";
import {
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  Button,
  CardActions,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent
} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import { ContextApi } from "./../../context-component/DataCentral";
import { Link } from "react-router-dom";
import CustomerFavProduct from './customerFavProduct';
import CustomerFavModal from './customerFavModal';
import { motion } from "framer-motion";


const CustomerFav = () => {
  const { customerFav, changingIncartBoolean, cakes, cart } = useContext(ContextApi);
  const [imgChoice, setImgChoice] = useState(false);
const [open , setOpen] = useState(false)
  const [currentCake, setCurrentCake] = useState([])
  const [slide, setSlide] = useState(false)
  
  window.addEventListener("scroll", () => {
    const scrollHeight = window.pageYOffset;
    const width = window.innerWidth;
    if (width > 6) {
      if (scrollHeight > 100) {
        setSlide(true);
      } else {
        setSlide(false);
      }
    }
  });
  
  useEffect(() => {
  
  }, [])
  const handleClickOpen = (id) => {
    customerFav.map((cake) =>{
      if (cake._id === id) {
        setCurrentCake(cake);
      }
   })
   setOpen(true);
  };
  
 const handleClose = () => {
   setOpen(false);
 };

  return (
    <div className={styles.customerFav}>
      <Container maxWidth="lg" className={styles.container}>
        <motion.h2
          initial={{ x: "-100vw" }}
          animate={{ x: slide ? 0 : "-100vw" }}
          transition={{ delay: 0.1 }}
          className={styles.heading}
        >
          OUR CUSTOMER FAVOURITE
        </motion.h2>
        <Grid container spacing={3}>
          {customerFav.map((cake) => {
            return (
              <CustomerFavProduct
                key={cake._id}
                cake={cake}
                handleClickOpen={handleClickOpen}
              />
            );
          })}
        </Grid>
      </Container>
      <CustomerFavModal
        handleClose={handleClose}
        currentCake={currentCake}
        open={open}
      />
    </div>
  );
};

export default CustomerFav;
