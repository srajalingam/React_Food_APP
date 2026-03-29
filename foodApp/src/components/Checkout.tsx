import React, { use } from 'react'
import Modal from './UI/Modal'
import CartContext from '../store/CartContext';
import {currencyFormater} from "../util/formatting.js"
import Input from './UI/Input.js';
import Button from './UI/Button.js';
import UserProgressContext from '../store/UserProgressContext.js';

const Checkout = () => {
    const cartCtx = use(CartContext);
    const userProgressCtx = use(UserProgressContext)
    const cartTotal = cartCtx.items.reduce(
        (total, item) => total + item.price * item.quantity,
        0,
      );
      function handleCloseCheckout(){
        userProgressCtx.hideCheckout()
      }
  return (
    <>
        <Modal open={userProgressCtx.progress =='checkout'} onClose={handleCloseCheckout} className="checkout">
            <h2>Checkout</h2>
            <p>Total Amount: {currencyFormater.format(cartTotal)}</p>
            <Input label="Your Name" id="full-name" type="text"/>
            <Input label="Your Email" id="email" type="email"/>
            <Input label="Your Address" id="street" type="text"/>
            <div className='control-row'>
                <Input label="Postal Code" id="postal-code" type="text"/>
                <Input label="City" id="city" type="text"/>
            </div>
            <p className='modal-actions'>
                <Button textOnly type="button" onClick={handleCloseCheckout}>
                    Close
                </Button>
                <Button>Submit Order</Button>
            </p>
        </Modal>
    </>
  )
}

export default Checkout