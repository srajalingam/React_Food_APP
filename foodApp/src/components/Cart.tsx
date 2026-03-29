import React, { use } from "react";
import Modal from "./UI/Modal";
import CartContext from "../store/CartContext";
import {currencyFormater} from "../util/formatting.js"
import Button from "./UI/Button";
import UserProgressContext from "../store/UserProgressContext";
import CartItem from "./CartItem.js";

const Cart = () => {
 console.log("cart component rendered");
  const cartCtx = use(CartContext);
  const userProgressCtx = use(UserProgressContext);
  const cartTotal = cartCtx.items.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  function closeCartHandler(){
    userProgressCtx.hideCart()
  }

   function handleGoToCheckout(){
    userProgressCtx.showCheckout()
   }

  return (
    <>
      
      <Modal className="cart" open={userProgressCtx.progress === "cart"} onClose={userProgressCtx.progress === "cart" ? closeCartHandler : null}>
        <h2>Cart</h2>
        <ul>
          {cartCtx.items.map((item) => (
           <CartItem key={item.id} item={item} onIncrease={()=>cartCtx.addItem(item)} onDecrease={()=>cartCtx.removeItem(item.id)} />
          ))}
        </ul>
        <p className="cart-total">
          Total: ${currencyFormater.format(cartTotal)}
        </p>
        <p className="modal-actions">
          <Button textOnly onClick={closeCartHandler}>
            Close
          </Button>
          {
            cartCtx.items.length>0 && <Button onClick={handleGoToCheckout}>
              Go to Checkout
            </Button>
          }
          
        </p>
      </Modal>
    </>
  );
};

export default Cart;
