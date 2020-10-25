import React, { useContext, useState } from 'react';
import styles from "./Checkout.module.css";
import allStates from './locations.json'
import { ContextApi } from './../context-component/DataCentral';
import {
  Container,
  Typography,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  Accordion,
  TextField,
  AccordionDetails,
  AccordionSummary,
  Grid,
} from "@material-ui/core";


const Address = ({handleAddressChange, handleSwitch, id, address, firstName, lastName,  phone, state, lga}) => {
    const [locations, setLocations] = useState(allStates); 
 const {currentUser} = useContext(ContextApi)
  
   
  
  return (
    <form action="" className={styles.form}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} className={styles.grid}>
          <TextField
            id="standard-basic"
            label="First Name"
            className={styles.text_field}
            onChange={handleAddressChange}
            value={firstName}
            name="first"
          />
        </Grid>
        <Grid item xs={12} sm={6} className={styles.grid}>
          <TextField
            id="standard-basic"
            label="Last Name"
            className={styles.text_field}
            onChange={handleAddressChange}
            value={lastName}
            name="last"
          />
        </Grid>
        <Grid item xs={12} sm={6} className={styles.grid}>
          <TextField
            id="standard-basic"
            label="Phone Number"
            className={styles.text_field}
            onChange={handleAddressChange}
            value={phone}
            name="phone"
            type="tel"
          />
        </Grid>
        <Grid item xs={12} sm={6} className={styles.grid}>
          <TextField
            id="standard-basic"
            label="Address"
            className={styles.text_field}
            onChange={handleAddressChange}
            value={address}
            name="address"
          />
        </Grid>
        <Grid item xs={12} sm={6} className={styles.grid}>
          <FormControl className={styles.myForm_control}>
            <InputLabel id="demo-simple-select-label">State</InputLabel>
            <Select
              labelId="State"
              id="demo-simple-select"
              name="state"
              onChange={handleSwitch}
              value={state}
            >
              {locations.map((location) => {
                return (
                  <MenuItem key={location.state.id} value={location.state.name}>
                    {location.state.name}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} className={styles.grid}>
          <FormControl className={styles.myForm_control}>
            <InputLabel id="demo-simple-select-label">
              Local Government
            </InputLabel>
            <Select
              labelId="Local Government"
              id="demo-simple-select"
              name="lga"
              onChange={handleSwitch}
              value={lga}
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
    </form>
  );
}
 
export default Address;