import React, { useContext } from "react";

import Header from "./../header-component/Header";
import Home from "./../home-component/Home";
import Footer from "../footer-component/Footer";
import { BrowserRouter as Router, Link, Switch, Route } from "react-router-dom";
import Cart from './../cart-component/Cart';
import Category from './../category-component/Category';
import Checkout from './../checkout-component/Checkout';
import PaymentPage from './../payment-component/Payment';
import VerifyPayment from './../payment-component/Verify_payment';
import SignIn from './../sign_in_component/SignIn';
import CreateAccount from './../create_account_component/CreateAccount';
import UserAccount from './../user-account-component/UserAccount';
import { ContextApi } from './../context-component/DataCentral';




const App = () => {
  const { currentUser } = useContext(ContextApi)
  
  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/cart" component={Cart} />
        <Route path="/categories/:category" component={Category} />
        <Route path="/checkout" exact component={currentUser ? Checkout : SignIn}/>
        <Route path="/sign_in" component={currentUser ? UserAccount : SignIn }/>
        <Route
          path="/checkout/payment/:id/:orderSummaryTotal"
          component={PaymentPage}
        />
        <Route path="/verify" component={VerifyPayment} />

        <Route path="/create_account" component={CreateAccount} />
        <Route path="/user_account" component={currentUser? UserAccount : SignIn} />
      </Switch>
      <Footer/>
    </Router>
  );
};

export default App;
