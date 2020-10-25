import React, { useState, useContext, useEffect } from "react";
import { Container, Grid, CardContent,Card, Typography, CardActions, Button  } from "@material-ui/core";
import styles from "./Category.module.css";
import { ContextApi } from "./../context-component/DataCentral";
import CategoryItem from "./CategoryItem";
import CustomerFavModal from './../home-component/displayProduct-component/customerFavModal';
import ShopDropdown from './../shop-component/ShopDropdown';
import  axios  from 'axios';

const Category = ({ match }) => {
  
  //const { cakes } = useContext(ContextApi);
  const [open, setOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState([])
   const [currentCake, setCurrentCake] = useState([]);

  useEffect(() => {
    axios
      .get(
        `https://damtim-api.herokuapp.com/damtim/api/types/${match.params.category}`
      )
      .then((data) => {
        setSelectedCategory(data.data);
      });
  }, [match])
  
  const handleClickOpen = (id) => {
     
     selectedCategory.map((cake) => {
       if (cake._id === id) {
         setCurrentCake(cake);
       }
     });
     setOpen(true);
   };

   const handleClose = () => {
     setOpen(false);
   };
  return (
    <div className={styles.categoryPage}>
      <div className={styles.categoryBanner}>
        <div className={styles.overlay}>
          <Typography variant="h4">{match.params.category}</Typography>
        </div>
      </div>

      <Container className={styles.container}>
        <Grid container spacing={5}>
          {selectedCategory.map((cake) => {
            return (
              <CategoryItem
                handleClickOpen={handleClickOpen}
                key={cake._id}
                cake={cake}
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
      <ShopDropdown/>
    </div>
  );
};

export default Category;
