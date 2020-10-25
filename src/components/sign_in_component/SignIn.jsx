import React, { useContext, useEffect, useState } from "react";
import styles from "./SignIn.module.css";
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
import axios from 'axios'
import { ContextApi } from './../context-component/DataCentral';
import { useHistory } from 'react-router-dom';
import ShopDropdown from './../shop-component/ShopDropdown';
const SignIn = () => {
  const history = useHistory()
  const {setUserToken, currentUser, setCurrentUser} = useContext(ContextApi)
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
const [response, setResponse] = useState('')
 


  const handleSubmit = (e) => {
    e.preventDefault()
    axios
      .post("https://damtim-api.herokuapp.com/user/login", {
        email: email,
        password: password,
      })
      .then((data) => {
        setResponse(data.data.msg);

        setUserToken(data.data.token);
        axios
          .get("https://damtim-api.herokuapp.com/user/user-account", {
            headers: {
              "auth-token": data.data.token,
            },
          })
          .then((data) => {
            console.log(data);

            setCurrentUser(data.data);
            history.push("/user_account");
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
}


  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === "password") {
      setPassword(value);
    }
    if (name === "email") {
      setEmail(value);
    }
  };

  return (
    <div className={styles.sign_in}>
      <Container maxWidth="sm" className={styles.my_container}>
        <form className={styles.my_form}>
          <Typography variant="h5" className={styles.my_header_typo}>
            Login
          </Typography>
          <Divider className={styles.my_form_divider} />
          <TextField
            id="outlined-basic"
            label="Email"
            variant="outlined"
            className={styles.text_field}
            name='email'
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
          <Typography style={{color: 'red'}} >
            {response}
</Typography>
          <Button
            variant="contained"
            color="primary"
            className={styles.login_btn}
            onClick={handleSubmit}
          >
            Login
          </Button>
        </form>
      </Container>
      <ShopDropdown />
    </div>
  );
};

export default SignIn;
