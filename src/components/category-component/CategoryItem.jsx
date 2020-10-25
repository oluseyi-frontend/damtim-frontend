import React, { useState, useContext } from 'react';
import {
  Container,
  Grid,
  CardContent,
  Card,
  Typography,
  CardActions,
  Button,
} from "@material-ui/core";
import styles from "./Category.module.css";
import { ContextApi } from './../context-component/DataCentral';

const CategoryItem = ({ cake, handleClickOpen }) => {
   
  const { handleAddToCart } = useContext(ContextApi);

  return (
    <Grid key={cake._id} container item sm={6} md={4} lg={3}>
      <Card className={styles.root}>
        <CardContent>
          <img
            className="trial"
            src={cake.image}
            alt=""
            className={styles.cakeImg}
          />
          <div className={styles.cakeName}>
            <Typography
              className={styles.title}
              color="textSecondary"
              gutterBottom
            >
              Name:
            </Typography>
            <Typography
              className={styles.title}
              color="textSecondary"
              gutterBottom
            >
              {cake.name}
            </Typography>
          </div>
          <div className={styles.cakePrice}>
            <Typography color="textSecondary" gutterBottom>
              Price:
            </Typography>
            <Typography color="textSecondary" gutterBottom>
              {cake.amount}
            </Typography>
          </div>

          <CardActions className={styles.cardActions}>
            <Button
              size="small"
              onClick={() => {
                handleClickOpen(cake._id);
                handleAddToCart(cake._id);
              }}
              disabled={cake.inCart}
            >
              {cake.inCart ? "Added to Cart" : "Add to Cart"}
            </Button>
          </CardActions>
        </CardContent>
      </Card>
    </Grid>
  );
};
 
export default CategoryItem;