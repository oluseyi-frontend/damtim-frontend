import React, { useContext } from "react";
import styles from "./Shop.module.css";
import { ContextApi } from "./../context-component/DataCentral";
import { Grid, Container } from '@material-ui/core';
import { Link } from "react-router-dom";
import image from './../images/cake2.jpg'
const ShopDropdown = () => {
  const { slideDown, setSlideDown, categories } = useContext(ContextApi);
  const handleSlideUp = () => {
    setSlideDown(false);
  };

  const handleSlideDown = () => {
    setSlideDown(true);
  };

  return (
    <div
      onMouseEnter={handleSlideDown}
      onMouseLeave={handleSlideUp}
      className={slideDown ? styles.shop_dropdown_active : styles.shop_dropdown}
    >
      <Container maxWidth="xl" className={styles.my_container}>
        <Grid container spacing={3}>
          <Grid item xs={10}>
            <Grid container spacing={5}>
              {categories.map((category) => {
                return (
                  <Grid item xs={4} key={category._id}>
                    <Link to={`/categories/${category.name}`}>{category.name}</Link>
                  </Grid>
                );
              })}
            </Grid>
          </Grid>

          <Grid item xs={2}>
            <img src={image} alt=""/>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default ShopDropdown;
