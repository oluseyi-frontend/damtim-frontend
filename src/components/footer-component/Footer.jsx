import React, { Component } from "react";
import styles from "./Footer.module.css";
import { Container, Grid, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import MailOutlineOutlinedIcon from "@material-ui/icons/MailOutlineOutlined";
import CallOutlinedIcon from "@material-ui/icons/CallOutlined";
import LocationOnOutlinedIcon from "@material-ui/icons/LocationOnOutlined";
import FacebookIcon from "@material-ui/icons/Facebook";
import TwitterIcon from "@material-ui/icons/Twitter";
import InstagramIcon from "@material-ui/icons/Instagram";

const Footer = () => {
  return (
    <div className={styles.footer}>
      <Container maxWidth="md" className={styles.my_container}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={4} className={styles.left_grid}>
            <Typography variant="h6">DAMTIM</Typography>
            <Typography>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptas
              quo libero amet dolor dolorum expedita.
            </Typography>
            <div className={styles.links}>
              <a href="">
                <FacebookIcon />
              </a>
              <a href="">
                <TwitterIcon />
              </a>
              <a href="">
                <InstagramIcon />
              </a>
            </div>
          </Grid>
          <Grid item xs={12} sm={4} className={styles.middle_grid}>
            <Typography variant="h6">Links</Typography>
            <Link>About</Link>
            <Link>Service</Link>
            <Link>Contact Us</Link>
          </Grid>
          <Grid item xs={12} sm={4} className={styles.right_grid}>
            <Typography variant="h6">Contact us</Typography>
            <div className={styles.email}>
              <MailOutlineOutlinedIcon />
              <Typography>damtim@gmail.com</Typography>
            </div>
            <div className={styles.tel}>
              <CallOutlinedIcon />
              <Typography>08114426271</Typography>
            </div>
            <div className={styles.address}>
              <LocationOnOutlinedIcon />
              <Typography>No 5 Akobo Ibadan, Nigeria</Typography>
            </div>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Footer;
