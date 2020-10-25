import React, { useState, useContext} from "react";
import styles from "./Header.module.css";
import SearchIcon from "@material-ui/icons/Search";
import CloseOutlinedIcon from "@material-ui/icons/CloseOutlined";
import {
  Button,
  Container,
  Grid,
  FormControl,
    Input,
  FilledInput,
  InputAdornment,
  IconButton,
  InputLabel,
  TextField,
    Typography,
    OutlinedInput,
  Divider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Menu,
  MenuItem,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { ContextApi } from './../context-component/DataCentral';
import { Link } from "react-router-dom";

const NavActive = ({ openAside, handleClose }) => {
  const { slideDown, setSlideDown, categories } = useContext(ContextApi);
  const [expanded, setExpanded] = useState(false);
const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose2 = () => {
    console.log('clicked')
    
         setAnchorEl(null);
  
 
  };

   const handleChange = (panel) => (event, isExpanded) => {
     setExpanded(isExpanded ? panel : false);
  };
 

  return (
    <div className={openAside ? styles.asideActive : styles.navActive}>
      <Container maxWidth="sm" className={styles.asideContainer}>
        <div className={styles.innerContainer}>
          <div className={styles.svg_logo}>
            <CloseOutlinedIcon onClick={handleClose} />
          </div>

          <FormControl variant="filled" className={styles.formControl}>
            <OutlinedInput
              id="outlined-adornment-password"
              type="text"
              name="search"
              className={styles.adornment}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    edge="end"
                  >
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
          <Button className={styles.btn}>
            <Accordion
              expanded={expanded === "panel3"}
              onChange={handleChange("panel3")}
              className={styles.my_accordion}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel3bh-content"
                id="panel3bh-header"
                className={styles.accordion_summary}
              >
                <Typography className={styles.heading}>Shop</Typography>
              </AccordionSummary>
              <AccordionDetails className={styles.myaccordion_details}>
                {categories.map((category) => {
                  return (
                    <div className={styles.aside_accordion} key={category._id}>
                      <Link to={`/categories/${category.name}`}>
                        {category.name}
                      </Link>
                    </div>
                  );
                })}
              </AccordionDetails>
            </Accordion>
          </Button>
          <Divider className={styles.divider} />
          <Button className={styles.btn}>
            <Link to="/cart">Cart</Link>
          </Button>
          <Divider className={styles.divider} />
          <Button className={styles.btn}>
            <Link>Our Services</Link>
          </Button>
          <Divider className={styles.divider} />
          <Button className={styles.btn} onClick={handleMenu}>
            <Accordion
              expanded={expanded === "panel4"}
              onChange={handleChange("panel4")}
              className={styles.my_accordion}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel3bh-content"
                id="panel3bh-header"
                className={styles.accordion_summary}
              >
                <Typography className={styles.heading}>Account</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <div className={styles.navactive_links}>
                  <Link to="/sign_in">Login</Link>
                  <Link to="/create_account">Create account</Link>
              
                </div>
              </AccordionDetails>
            </Accordion>
          </Button>
          <Divider className={styles.divider} />
        </div>
      </Container>
    </div>
  );
};

export default NavActive;
