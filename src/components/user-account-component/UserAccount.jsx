import React, { Component, useContext, useEffect } from "react";
import { useState } from "react";
import { ContextApi } from "./../context-component/DataCentral";
import styles from "./UserAccount.module.css";
import {
  Container,
  Typography,
  Card,
  CardContent,
  CardActions,
    Button,
    Grid,
    TextField,
    FormControl,
    Select,
    MenuItem,
  InputLabel
} from "@material-ui/core";
import allStates from "./../checkout-component/locations.json";
import axios from 'axios'
import { useHistory } from "react-router";
import ShopDropdown from './../shop-component/ShopDropdown';
const UserAccount = () => {
  const history = useHistory()
    const { currentUser } = useContext(ContextApi);
  const [state, setState] = useState("");
  const [lga, setLga] = useState("");
  const [id, setId] = useState();
  const [locations, setLocations] = useState(allStates);
  const [first, setFirst] = useState(currentUser.first_name);
  const [last, setLast] = useState(currentUser.last_name);
  const [address, setAddress] = useState(currentUser.address);
  const [phone, setPhone] = useState(currentUser.phone);
  const [response, setResponse] = useState('')
 

    const handleSubmit = (e) => {
        e.preventDefault()
        axios
          .patch(
            `https://damtim-api.herokuapp.com/user/user_account/${currentUser._id}`,
            {
              first_name: first,
              last_name: last,
              phone: phone,
              address: address,
              state: state,
              lga: lga,
              email: currentUser.email,
            }
          )
          .then((data) => {
            console.log(data);
            setResponse(data.data.msg);
          })
          .catch((err) => {
            console.log(err);
          });
    }
    
    
     const handleAddressChange = (event) => {
       const { name, value } = event.target;
       if (name == "first") {
         setFirst(value);
       }
       if (name == "last") {
         setLast(value);
       }
       if (name == "address") {
         setAddress(value);
       }
       if (name == "phone") {
         setPhone(value);
       }
    };
    
     const handleSwitch = (event) => {
       const { name, value } = event.target;
       const id = locations.findIndex((location) => {
         if (location.state.name == value) {
           return location;
         }
       });

       if (name === "state") {
         setId(id);
         setState(value);
       }
       if (name === "lga") {
         setLga(value);
       }
     };

  return (
    <div className={styles.user_account}>
      <Container maxWidth="md" className={styles.my_container}>
        <Card className={styles.my_card}>
          <CardContent>
            <Typography
              className={styles.title}
              color="textSecondary"
              gutterBottom
            >
              {currentUser.email}
            </Typography>
            <Typography
              className={styles.title}
              color="textSecondary"
              gutterBottom
            >
              fill details now to prevent filling details during the ordering
              process
            </Typography>
          </CardContent>
        </Card>
        <form action="" className={styles.form}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                id="outlined-basic"
                variant="outlined"
                label="First Name"
                className={styles.text_field}
                onChange={handleAddressChange}
                value={first}
                name="first"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Last Name"
                className={styles.text_field}
                onChange={handleAddressChange}
                value={last}
                name="last"
                id="outlined-basic"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Phone Number"
                className={styles.text_field}
                onChange={handleAddressChange}
                value={phone}
                name="phone"
                type="text"
                id="outlined-basic"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Address"
                className={styles.text_field}
                onChange={handleAddressChange}
                value={address}
                name="address"
                id="outlined-basic"
                variant="outlined"
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl variant="outlined" className={styles.myForm_control}>
                <InputLabel id="demo-simple-select-label">State</InputLabel>
                <Select
                  labelId="State"
                  id="demo-simple-select"
                  name="state"
                  onChange={handleSwitch}
                  value={state}
                  label="State"
                >
                  {locations.map((location) => {
                    return (
                      <MenuItem
                        key={location.state.id}
                        value={location.state.name}
                      >
                        {location.state.name}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl variant="outlined" className={styles.myForm_control}>
                <InputLabel id="demo-simple-select-label">
                  Local Government
                </InputLabel>
                <Select
                  labelId="Local Government"
                  id="demo-simple-select"
                  name="lga"
                  onChange={handleSwitch}
                  value={lga}
                  label="Local Government"
                >
                  {id == undefined
                    ? null
                    : locations[id].state.locals.map((local) => {
                        return (
                          <MenuItem key={local.id} value={local.name}>
                            {local.name}
                          </MenuItem>
                        );
                      })}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Typography style={{color: 'red'}}>
            {response}
</Typography>
          <Button className={styles.submit_btn} variant="contained" color="primary" onClick={handleSubmit}>
            Submit
          </Button>
        </form>
      </Container>
      <ShopDropdown/>
    </div>
  );
};

export default UserAccount;
