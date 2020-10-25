import React, { Component, useState, useEffect } from "react";
import { cakeData } from "./../../data";
import axios from "axios";
import { categoriesData } from "./../../data";
export const ContextApi = React.createContext();




const DataCentral = (props) => {
  const [cakes, setCakes] = useState([]);
  const [customerFav, setCustomerFav] = useState([]);
  const [cart, setCart] = useState([]);
  const [subtotal, setSubTotal] = useState(0);
  const [tax, setTax] = useState(0);
  const [total, setTotal] = useState(0);
  const [slideDown, setSlideDown] = useState(false);
  const [categories, setCategories] = useState([]);
  const [orderId, setOrderId] = useState();
  const [userToken, setUserToken] = useState('')
const [currentUser, setCurrentUser] = useState(null)

  useEffect(() => {
    axios
      .get("https://damtim-api.herokuapp.com/damtim/api/cakes")
      .then((data) => {
        setCakes(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
    //setCakes(cakeData);
    axios
      .get("https://damtim-api.herokuapp.com/damtim/api//cakes/categories")
      .then((data) => {
        setCategories(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
    //setCategories(categoriesData);
  }, []);

  useEffect(() => {
    const newArray = cakes.filter((cake) => {
      if (cake.customerFav === true) {
        return cake;
      }
    });
    setCustomerFav(newArray);
  }, [cakes]);

  useEffect(() => {
    changingIncartBoolean();
    addingToLocalStorage();
    handleCalculationsInCart();
  }, [cart]);

  const changingIncartBoolean = () => {
    cakes.map((cake) => {
      if (cart.length == 0) {
        cake.inCart = false;
      }
      cart.map((item) => {
        if (cake._id === item._id) {
          cake.inCart = true;
          cake.total = cake.count * cake.newAmount;
        }
      });
    });
  };
  const handleAddToCart = (id) => {
    cakes.filter((cake) => {
      if (cake._id == id) {
        cake.newAmount = cake.amount
        setCart([...cart, cake]);
      }
    });
  };

  const addingToLocalStorage = () => {
    if (cart.length == 0) {
      if (localStorage.hasOwnProperty("damtimcart")) {
        const newcart = JSON.parse(localStorage.getItem("damtimcart"));
        setCart(newcart);
      } else {
      }
    } else {
      localStorage.setItem("damtimcart", JSON.stringify(cart));
    }
  };
  const handleIncreament = (id) => {
    let tempCart = [...cart];
    const selectedItem = cart.find((item) => {
      if (item._id === id) {
        return item;
      }
    });
    const index = cart.indexOf(selectedItem);
    const product = tempCart[index];
    product.count = product.count + 1;
    product.total = product.count * product.newAmount;
    setCart(tempCart);
  };
  const handleDecreament = (id) => {
    let tempCart = [...cart];
    const selectedItem = cart.find((item) => {
      if (item._id === id) {
        return item;
      }
    });
    const index = cart.indexOf(selectedItem);
    const product = tempCart[index];
    product.count = product.count - 1;
    product.total = product.count * product.newAmount;
    setCart(tempCart);

    if (product.count < 1) {
      handleRemove(id);
    }
  };

  const handleRemove = (id) => {
    cakes.map((cake) => {
      cart.map((item) => {
        if (cake._id === id) {
          cake.inCart = false;
          cake.total = cake.count * cake.newAmount;
        }
      });
    });
    const remainingItems = cart.filter((item) => {
      if (item._id !== id) {
        return item;
      }
    });

    setCart(remainingItems);
    if (remainingItems.length == 0) {
      localStorage.clear();
    }
  };

  const handleClearCart = () => {
    setCart([]);

    localStorage.clear();
    changingIncartBoolean();
  };

  const addingSizeToItem = (id, value, name) => {
    if (name == "size") {
      let tempCart = [...cart];
      const selectedItem = cart.find((item) => {
        if (item._id === id) {
          return item;
        }
      });
      const index = cart.indexOf(selectedItem);
      const product = tempCart[index];
      product.size = value;
       if (value == '10"') {
         product.newAmount = product.amount
         product.total = product.newAmount * product.count
       }
      if (value == '20"') {
        product.newAmount = product.amount * 1.5
         product.total = product.newAmount * product.count;
      }
        if (value == '25"') {
          product.newAmount = product.amount * 1.7
           product.total = product.newAmount * product.count;
}
      setCart(tempCart);
    }
    if (name == "color") {
      let tempCart = [...cart];
      const selectedItem = cart.find((item) => {
        if (item._id === id) {
          return item;
        }
      });
      const index = cart.indexOf(selectedItem);
      const product = tempCart[index];
      product.color = value;

      setCart(tempCart);
    }
  };

  const handleCalculationsInCart = () => {
    let subtotal = 0;
    cart.map((item) => {
      subtotal += item.total;
    });
    setSubTotal(subtotal);
    let tempTax1 = 0.1 * subtotal;
    let tempTax2 = Math.floor(tempTax1);
    setTax(tempTax2);
    let total = tempTax2 + subtotal;
    setTotal(total);
  };

 
  return (
    <ContextApi.Provider
      value={{
        cakes: cakes,
        customerFav: customerFav,
        handleAddToCart: handleAddToCart,
        cart: cart,
        handleIncreament: handleIncreament,
        handleDecreament: handleDecreament,
        handleRemove: handleRemove,
        changingIncartBoolean: changingIncartBoolean,
        subtotal: subtotal,
        tax: tax,
        total: total,
        addingSizeToItem: addingSizeToItem,
        slideDown: slideDown,
        setSlideDown,
        setSlideDown,
        categories: categories,
        handleClearCart: handleClearCart,
        orderId: orderId,
        setOrderId: setOrderId,
        setUserToken: setUserToken,
        currentUser: currentUser,
       setCurrentUser: setCurrentUser
      }}
    >
      {props.children}
    </ContextApi.Provider>
  );
};

export default DataCentral;
