import React, { useState, useContext } from 'react';
import styles from './Cart.module.css'
import RemoveIcon from "@material-ui/icons/Remove";
import AddIcon from "@material-ui/icons/Add";
import { ContextApi } from "./../context-component/DataCentral";
import {
  Button,
  IconButton,
  Typography,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Card,
  CardContent,
  CardActions,
  Grid,
} from "@material-ui/core";


const CartItem = ({ item }) => {

    const {handleDecreament,  handleIncreament, addingSizeToItem, handleRemove} = useContext(ContextApi)
  const [size, setSize] = useState('')
  const [color, setColor] = useState('')


  const handleChange = (id, event) => {
    const { name, value } = event.target
    if (name == 'size') {
      addingSizeToItem(id, value, name)
      setSize(value)
    } if (name == 'color') {
      addingSizeToItem(id, value, name);
      setColor(value)
    }
  }

  return (
    <Card className={styles.main_card}>
      <CardContent>
        <Grid container spacing={2}>
          <Grid
            className={styles.card_content}
            item
            lg={6}
            md={6}
            sm={6}
            xs={12}
          >
            <img src={item.image} alt="" />
          </Grid>

          <Grid item lg={6} md={6} sm={6} xs={12}>
            <div className={styles.itemDetails}>
              <div className={styles.name_price}>
                <Typography
                  className={styles.cardTitle}
                  color="textSecondary"
                  gutterBottom
                >
                  {item.name}
                </Typography>
              </div>
              <div className={styles.price}>
                <Typography
                  className={styles.cardTitle}
                  color="textSecondary"
                  gutterBottom
                >
                  Price:
                </Typography>
                <Typography
                  className={styles.cardTitle}
                  color="textSecondary"
                  gutterBottom
                >
                  {item.newAmount}
                </Typography>
              </div>

              <div className={styles.qtyBtn}>
                <Typography
                  className={styles.cardTitle}
                  color="textSecondary"
                  gutterBottom
                >
                  Qty:
                </Typography>
                <div>
                  <IconButton
                    variant="contained"
                    color="secondary"
                    className={styles.iconBtn}
                    aria-label="close"
                    onClick={() => {
                      handleDecreament(item._id);
                    }}
                  >
                    <RemoveIcon />
                  </IconButton>
                  <IconButton className={styles.iconBtn}>
                    <Typography>{item.count}</Typography>
                  </IconButton>
                  <IconButton
                    variant="contained"
                    color="primary"
                    className={styles.iconBtn}
                    aria-label="close"
                    onClick={() => {
                      handleIncreament(item._id);
                    }}
                  >
                    <AddIcon />
                  </IconButton>
                </div>
              </div>
              <div className={styles.sizeAction}>
                <FormControl className={styles.myFormControl}>
                  <InputLabel id="demo-simple-select-label">Size</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={item.size}
                    name="size"
                    onChange={(event) => {
                      handleChange(item._id, event);
                    }}
                  >
                    <MenuItem value='10"'>10"</MenuItem>
                    <MenuItem value='20"'>20"</MenuItem>
                    <MenuItem value='25"'>25"</MenuItem>
                  </Select>
                </FormControl>
              </div>

              <div className={styles.colorAction}>
                <FormControl className={styles.myFormControl}>
                  <InputLabel id="demo-simple-select-label">Color</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={item.color}
                    name="color"
                    onChange={(event) => {
                      handleChange(item._id, event);
                    }}
                  >
                    <MenuItem value="blue">Blue</MenuItem>
                    <MenuItem value="red">Red</MenuItem>
                    <MenuItem value="pink">Pink</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <div className={styles.item_total}>
                <Typography
                  className={styles.cardTitle}
                  color="textSecondary"
                  gutterBottom
                >
                  item total:
                </Typography>
                <Typography
                  className={styles.cardTitle}
                  color="textSecondary"
                  gutterBottom
                >
                  {item.total}
                </Typography>
              </div>

              <Button
                onClick={() => {
                  handleRemove(item._id);
                }}
                variant="contained"
                className={styles.removeBtn}
              >
                Remove
              </Button>
            </div>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
 
export default CartItem;