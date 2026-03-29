import React, { use, useActionState } from "react";
import Modal from "./UI/Modal";
import CartContext from "../store/CartContext";
import { currencyFormater } from "../util/formatting.js";
import Input from "./UI/Input.js";
import Button from "./UI/Button.js";
import UserProgressContext from "../store/UserProgressContext.js";
import useHttp from "../hooks/useHttp.js";

const requestConfig = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
};

const Checkout = () => {
  const cartCtx = use(CartContext);
  const userProgressCtx = use(UserProgressContext);
  const cartTotal = cartCtx.items.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  const {
    data,
    error,
    sendRequest,
    clearData,
  } = useHttp("http://localhost:3000/orders", requestConfig, null);

  function handleCloseCheckout() {
    userProgressCtx.hideCheckout();
  }

  function handleFinishCheckout() {
    cartCtx.clearCart();
    userProgressCtx.hideCheckout();
    clearData();
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

    sendRequest(
      JSON.stringify({
        order: {
          items: cartCtx.items,
          customer: customerData,
        },
      }),
    );

    // fetch("http://localhost:3000/orders", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     order: {
    //         items: cartCtx.items,
    //         customer: customerData,
    //     },
    //   }),
    // }).then((res) => {
    //       console.log(res);
    // });
  }
  
  async function checkoutAction(prevState, fd) {
    const customerData = Object.fromEntries(fd.entries());
    console.log(customerData);

    await sendRequest(
      JSON.stringify({
        order: {
          items: cartCtx.items,
          customer: customerData,
        },
      }),
    );
  }

  const[formState,formAction,isSending] =useActionState(checkoutAction,null);

  let actions = (
    <>
      <Button textOnly type="button" onClick={handleFinishCheckout}>
        Close
      </Button>
      <Button>Submit Order</Button>
    </>
  );
  if (isSending) {
    actions = <p>Sending order data...</p>;
  }
  if (error) {
    actions = <p>{error}</p>;
  }
  if (data && !error) {
    return (
      <Modal
        open={userProgressCtx.progress == "checkout"}
        onClose={handleCloseCheckout}
        className="checkout"
      >
        <h2>Order Placed!</h2>
        <p>Your order has been placed successfully.</p>
        <p className="modal-actions">
          <Button onClick={handleFinishCheckout}>Okay</Button>
        </p>
      </Modal>
    );
  }
  return (
    <>
      <Modal
        open={userProgressCtx.progress == "checkout"}
        onClose={handleCloseCheckout}
        className="checkout"
      >
        <form action={formAction}>
          <h2>Checkout</h2>
          <p>Total Amount: {currencyFormater.format(cartTotal)}</p>
          <Input label="Your Name" id="name" type="text" />
          <Input label="Your Email" id="email" type="email" />
          <Input label="Your Address" id="street" type="text" />
          <div className="control-row">
            <Input label="Postal Code" id="postal-code" type="text" />
            <Input label="City" id="city" type="text" />
          </div>
          <p className="modal-actions">{actions}</p>
        </form>
      </Modal>
    </>
  );
};

export default Checkout;
