import React, { Component } from 'react';
import styles from './Banner.module.css'
import { Typography, Button } from '@material-ui/core';
import { motion } from 'framer-motion';
import ShopDropdown from '../shop-component/ShopDropdown';

const Banner = () => {
    return (
      <div className={styles.banner}>
        <div className={styles.bannerContainer}>
          <motion.h2
            initial={{ x: "100vw" }}
            animate={{ x: "0vw" }}
            transition={{ delay: 0, duration: 0.5 }}
          >
            WELCOME
          </motion.h2>
          <motion.h3
            initial={{ x: "-100vw" }}
            animate={{ x: "0vw" }}
            transition={{ delay: 0.5 }}
          >
            TO
          </motion.h3>
          <motion.h3
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, rotateY: 360 }}
            transition={{ delay: 1, duration: 0.5 }}
          >
            DAMTIM CAKE WORLD
          </motion.h3>
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
            className={styles.btn}
            color="secondary"
          >
            Shop now
          </motion.button>
        </div>
        <ShopDropdown />
      </div>
    );
}
 
export default Banner;