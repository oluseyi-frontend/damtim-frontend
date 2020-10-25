import React, { useState, useEffect, useContext } from "react";
import styles from "./Checkout.module.css";
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
    Button,
    Card,
  CardContent
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Address from "./Address";
import Delivery from "./Delivery";
import Payment from "./Payment";
import allStates from "./locations.json";
import OrderSummary from "./Order_Summary";
import { Link, useHistory } from "react-router-dom";
import uuid from 'react-uuid'
import axios  from 'axios';
import { ContextApi } from './../context-component/DataCentral';

const Checkout = () => {
    const history = useHistory()
  const { cart, total, orderId, currentUser, setOrderId } = useContext(ContextApi);
  const [expanded, setExpanded] = useState(false);
  const [deliveryValue, setDeliveryValue] = useState("");
  const [paymentValue, setPaymentValue] = useState("");
  const [state, setState] = useState("");
  const [lga, setLga] = useState("");
  const [id, setId] = useState();
  const [locations, setLocations] = useState(allStates);
  const [first, setFirst] = useState( currentUser.first_name);
  const [last, setLast] = useState(currentUser.last_name);
  const [address, setAddress] = useState(currentUser.address);
  const [phone, setPhone] = useState(currentUser.phone);
  const [addressGreenLight, setAddressGreenLight] = useState(false);
  const [paymentGreenLight, setPaymentGreenLight] = useState(false);
  const [deliveryGreenLight, setDeliveryGreenLight] = useState(false);
  const [finalGreenLight, setFinalGreenLight] = useState(false);
  const [shippingFee, setShippingFee] = useState(Number)
 
  const [orderSummaryTotal, setOrderSummaryTotal] = useState()
const [proceed, setProceed] = useState(true)
   
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

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

    useEffect(() => {
      setOrderSummaryTotal(total + shippingFee)

    if (first && last && phone && address && state && lga) {
      setAddressGreenLight(true);
    } else {
      setAddressGreenLight(false);
    }
    if (deliveryValue) {
      setDeliveryGreenLight(true);
    } else {
      setDeliveryGreenLight(false);
    }
    if (paymentValue) {
      setPaymentGreenLight(true);
    } else {
      setPaymentGreenLight(false);
    }

    if (addressGreenLight && deliveryGreenLight && paymentGreenLight) {
      setFinalGreenLight(true);
      setProceed(false)
       
    } else {
      setFinalGreenLight(false);
      setProceed(true)
      }
    
  });



    useEffect(() => {
        handleShippingFee()
    }, [state])

    useEffect(() => {
        handleShippingFee();
    }, [deliveryValue]);
    
  const handleDeliveryChange = (event) => {
    setDeliveryValue(event.target.value);
    };
    

    const handlePaymentChange = (event) => {
      setOrderId(uuid());
    setPaymentValue(event.target.value);
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

    
    const handleShippingFee = () => {
        const southWest = [
          "Osun State",
          "Oyo State",
          "Ondo State",
          "Lagos State",
          "Ekiti State",
          "Ogun State",
        ];
        const southEast = [
          "Enugu State",
          "Imo State",
          "Ebonyi State",
          "Anambra State",
          "Abia State",
        ];
        const SouthSouth = [
          "Delta State",
          "Edo State",
          "Cross River State",
          "Rivers State",
          "Akwa Ibom State",
          "Bayelsa State",
        ];
        const northCentral = [
          "Kwara State",
          "Plateau State",
          "Niger State",
          "FCT",
          "Nasarawa State",
          "Benue State",
          "Kogi State",
        ];
        const northEast = [
          "Yobe State",
          "Borno State",
          "Taraba State",
          "Bauchi State",
          "Zamfara State",
          "Adamawa State",
          "Gombe State",
        ];
        const northWest = [
          "Sokoto State",
          "Kano State",
          "Kaduna State",
          "Kebbi State",
          "Jigawa State",
          "Katsina State",
        ];
        const SWvalue = southWest.includes(state);
        const SEvalue = southEast.includes(state);
        const SSvalue = SouthSouth.includes(state);
        const NCvalue = northCentral.includes(state);
        const NEvalue = northEast.includes(state);
        const NWvalue = northWest.includes(state);

        if (deliveryValue === "pick up delivery") {
          setShippingFee(0);
        } else {
          if (SWvalue) {
            setShippingFee(1500);
          }
          if (SEvalue) {
            setShippingFee(3500);
          }
          if (SSvalue) {
            setShippingFee(3500);
          }
          if (NCvalue) {
            setShippingFee(4000);
          }
          if (NEvalue) {
            setShippingFee(6000);
          }
          if (NWvalue) {
            setShippingFee(5000);
          }
        }
    }


      const handleSubmitToDb = () => {
        axios
          .post("https://damtim-api.herokuapp.com/damtim/api/orders", {
            first_name: first,
            last_name: last,
            phone: phone,
            address: address,
            state: state,
            lga: lga,
            payment_type: paymentValue,
            delievery_type: deliveryValue,
            cart: cart,
            order_id: orderId,
          })
          .then((data) => {
            console.log(data);
          })
          .catch((err) => {
            console.log(err);
          });
      };
   
  return (
    <div className={styles.checkout}>
      <Container maxWidth="lg" className={styles.container}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Accordion
              expanded={expanded === "panel1"}
              onChange={handleChange("panel1")}
              className={styles.my_accordion}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
                className={
                  addressGreenLight
                    ? styles.accordion_summary_active
                    : styles.accordion_summary
                }
              >
                <Typography className={styles.heading}>
                  STEP 1: ADDRESS DETAILS{" "}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Address
                  handleAddressChange={handleAddressChange}
                  state={state}
                  id={id}
                  lga={lga}
                  handleSwitch={handleSwitch}
                  firstName={first}
                  lastName={last}
                  phone={phone}
                  address={address}
                />
              </AccordionDetails>
            </Accordion>
            <Accordion
              expanded={expanded === "panel2"}
              onChange={handleChange("panel2")}
              className={styles.my_accordion}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2bh-content"
                id="panel2bh-header"
                className={
                  deliveryGreenLight
                    ? styles.accordion_summary_active2
                    : styles.accordion_summary2
                }
              >
                <Typography className={styles.heading}>
                  STEP 2: DELIVERY METHOD
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Delivery
                  value={deliveryValue}
                  handleChange2={handleDeliveryChange}
                />
              </AccordionDetails>
            </Accordion>
            <Accordion
              expanded={expanded === "panel3"}
              onChange={handleChange("panel3")}
              className={styles.my_accordion}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel3bh-content"
                id="panel3bh-header"
                className={
                  paymentGreenLight
                    ? styles.accordion_summary_active3
                    : styles.accordion_summary3
                }
              >
                <Typography className={styles.heading}>
                  STEP 3: PAYMENT METHOD
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Payment
                  value2={paymentValue}
                  handleChange3={handlePaymentChange}
                />
              </AccordionDetails>
            </Accordion>
          </Grid>
          <Grid item xs={12} md={4}>
            <OrderSummary
              shippingFee={shippingFee}
              orderSummaryTotal={orderSummaryTotal}
            />
          </Grid>
        </Grid>

        <div className={styles.proceed_div}>
         
            <Button
              disabled={proceed}
              className={
                finalGreenLight ? styles.proceed_btn_active : styles.proceed_btn
              }
              variant="contained"
              color="primary"
              onClick={handleSubmitToDb}
          >
            <Link to={`/checkout/payment/${orderId}/${orderSummaryTotal}`}>
              Proceed
                </Link>
            </Button>
         
        </div>
      </Container>
    </div>
  );
};

export default Checkout;
