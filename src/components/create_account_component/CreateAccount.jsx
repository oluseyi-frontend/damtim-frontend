import React, { useState } from "react";
import styles from "./CreateAccount.module.css";
import {
  Container,
  Grid,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  Paper,
  TextField,
  Button,
  Typography,
  Divider,
} from "@material-ui/core";

import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { Link } from "react-router-dom";
import axios from 'axios'
import ShopDropdown from './../shop-component/ShopDropdown';


const CreateAccount = () => {
    const [showPassword, setShowPassword] = useState(false)
    const [password, setPassword] = useState('')
 const [email, setEmail] = useState("");
  const [first, setFirst] = useState('')
  const [last, setLast] = useState('')
  const [phone, setPhone] = useState('')
  const [response, setResponse] = useState('')
 const handleSubmit = (e) => {
   e.preventDefault();
   axios
     .post("https://damtim-api.herokuapp.com/user/register", {
       email: email,
       password: password,
       first_name: first,
       last_name: last,
       phone: phone,
     })
     .then((data) => {
       console.log(data.data);
       setResponse(data.data.msg);
     })
     .catch((err) => {
       console.log(err);
     });
 };

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword)
    }
    
    const handleMouseDownPassword = () => {
        setShowPassword(!showPassword);
    }

    const handleChange = (event) => {
        const { name, value } = event.target
        
        if (name === 'password') {
            setPassword(value)
      }
        if (name === "email") {
          setEmail(value);
      }
      if (name === 'phone') {
        setPhone(value)

      }  if (name === "first") {
        setFirst(value);
      }
        if (name === "last") {
          setLast(value);
        }
    }


  return (
    <div className={styles.create_account}>
      <Container maxWidth="md" className={styles.my_container}>
        <Grid container spacing={0} className={styles.general_grid}>
          <Grid item xs={12} sm={12} md={5} className={styles.first_grid}>
            <Typography variant="h5" className={styles.my_header_typo}>
              welcome to DamTim
            </Typography>
            <Divider className={styles.my_divider} />
            <Typography className={styles.my_typo}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga
              accusantium veritatis et, sint doloremque aliquid odio possimus
              praesentium a molestias nobis nam tenetur! Perspiciatis quaerat
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={7} className={styles.second_grid}>
            <form className={styles.my_paper}>
              <Typography variant="h5" className={styles.my_header_typo}>
                Create New Account
              </Typography>
              <Divider className={styles.my_form_divider} />
              <Typography>
                Dont have an account ? it takes less than a minute. if you you
                already have an account, <Link to="/sign_in">Login</Link>
              </Typography>
              <TextField
                id="outlined-basic"
                label="First Name"
                variant="outlined"
                className={styles.text_field}
                name="first"
                value={first}
                onChange={handleChange}
              />
              <TextField
                id="outlined-basic"
                label="Last Name"
                variant="outlined"
                className={styles.text_field}
                name="last"
                value={last}
                onChange={handleChange}
              />
              <TextField
                id="outlined-basic"
                label="Email"
                variant="outlined"
                className={styles.text_field}
                name="email"
                value={email}
                onChange={handleChange}
              />
              <FormControl className={styles.text_field} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">
                  Password
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={handleChange}
                  name="password"
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  }
                  labelWidth={70}
                />
              </FormControl>
              <TextField
                id="outlined-basic"
                label="Phone Number"
                variant="outlined"
                className={styles.text_field}
                name="phone"
                value={phone}
                onChange={handleChange}
              />
              <Typography style={{ color: 'red' }} >
                {response}
              </Typography>
              <Button
                variant="contained"
                color="primary"
                className={styles.create_btn}
                onClick={handleSubmit}
              >
                Create Account
              </Button>
            </form>
          </Grid>
        </Grid>
      </Container>
      <ShopDropdown/>
    </div>
  );
};

export default CreateAccount;
