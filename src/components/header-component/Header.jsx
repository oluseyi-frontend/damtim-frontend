import React, { useState, useEffect, useContext } from "react";
import {
  Button,
  Container,
  Menu,
  Grid,
  IconButton,
  MenuItem,
  TextField,
  Typography,
  InputBase,
} from "@material-ui/core";
import styles from "./Header.module.css";
import SearchIcon from "@material-ui/icons/Search";
import AccountCircle from "@material-ui/icons/AccountCircle";
import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined";
import PersonOutlineOutlinedIcon from "@material-ui/icons/PersonOutlineOutlined";
import MenuOutlinedIcon from "@material-ui/icons/MenuOutlined";
import NavActive from "./NavActive";
import ShopDropdown from "../shop-component/ShopDropdown";
import { ContextApi } from "./../context-component/DataCentral";
import { Link } from "react-router-dom";

const Header = () => {
  const [openAside, setOpenAside] = useState(false);
  const [openSearchInput, setOpenSearchInput] = useState(false);
  const { slidedown, setSlideDown } = useContext(ContextApi);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose2 = () => {
    setAnchorEl(null);
  };
  const handleOpen = () => {
    setOpenAside(true);
  };
  const handleClose = () => {
    setOpenAside(false);
  };
  window.addEventListener("resize", () => {
    if (window.innerWidth > 768) {
      setOpenAside(false);
    }
  });
  const handleopenSearchInput = () => {
    setOpenSearchInput(true);
  };
  const handleSlideDown = () => {
    setSlideDown(true);
  };
  const handleSlideUp = () => {
    setSlideDown(false);
  };
  return (
    <div className={styles.header}>
      <Container maxWidth="lg" className={styles.container}>
        <Grid
          alignItems="center"
          container
          spacing={1}
          className={styles.my_grid}
        >
          <Grid item xs={4} className={styles.leftContent}>
            <MenuOutlinedIcon onClick={handleOpen} />
            <Button onMouseEnter={handleSlideDown} onMouseLeave={handleSlideUp}>
              Shop
            </Button>
            <Button>Our Services</Button>
          </Grid>
          <Grid item xs={4} className={styles.centreContent}>
            <Link to="/">
              <h1>Damtim Cakes</h1>
            </Link>
          </Grid>
          <Grid item xs={4} className={styles.rightContent}>
            {/* <TextField className={styles.headerInput} id="standard-basic" label="Search" /> */}
            <Link to="/cart">
              <ShoppingCartOutlinedIcon />
            </Link>

            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
              className={styles.icon_btn}
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              className={styles.my_menu}
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={open}
              onClose={handleClose2}
            >
              <MenuItem className={styles.menu_item} onClick={handleClose2}>
                <Link to="/sign_in">Login</Link>
              </MenuItem>
              <MenuItem className={styles.menu_item} onClick={handleClose2}>
                <Link to="/create_account">Create Account</Link>
              </MenuItem>
            </Menu>
          </Grid>
        </Grid>
      </Container>

      <NavActive handleClose={handleClose} openAside={openAside} />
    </div>
  );
};

export default Header;
