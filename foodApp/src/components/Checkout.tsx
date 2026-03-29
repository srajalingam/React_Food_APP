import React, { use } from "react";
import Modal from "./UI/Modal";
import CartContext from "../store/CartContext";
import { currencyFormater } from "../util/formatting.js";
import Input from "./UI/Input.js";
import Button from "./UI/Button.js";
import UserProgressContext from "../store/UserProgressContext.js";

const Checkout = () => {
  const cartCtx = use(CartContext);
  const userProgressCtx = use(UserProgressContext);
  const cartTotal = cartCtx.items.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );
  function handleCloseCheckout() {
    userProgressCtx.hideCheckout();
  }
  function handleSubmit(e) {
    e.preventDefault();
    const fd = new FormData(e.target);
    // const userData = {
    //   name: fd.get("full-name"),
    //   email: fd.get("email"),
    //   street: fd.get("street"),
    //   postalCode: fd.get("postal-code"),
    //   city: fd.get("city"),
    // };
    // console.log(userData);
    const customerData = Object.fromEntries(fd.entries());
    console.log(customerData);

    fetch("http://localhost:3000/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        order: {
            items: cartCtx.items,
            customer: customerData,
        },
      }),
    }).then((res) => {  
          console.log(res);
    });

  }
  return (
    <>
      <Modal
        open={userProgressCtx.progress == "checkout"}
        onClose={handleCloseCheckout}
        className="checkout"
      >
        <form onSubmit={handleSubmit}>
          <h2>Checkout</h2>
          <p>Total Amount: {currencyFormater.format(cartTotal)}</p>
          <Input label="Your Name" id="name" type="text" />
          <Input label="Your Email" id="email" type="email" />
          <Input label="Your Address" id="street" type="text" />
          <div className="control-row">
            <Input label="Postal Code" id="postal-code" type="text" />
            <Input label="City" id="city" type="text" />
          </div>
          <p className="modal-actions">
            <Button textOnly type="button" onClick={handleCloseCheckout}>
              Close
            </Button>
            <Button>Submit Order</Button>
          </p>
        </form>
      </Modal>
    </>
  );
};

export default Checkout;
