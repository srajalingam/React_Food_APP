import React from 'react'
import {currencyFormater} from "../util/formatting.js"

const CartItem = ({item,onIncrease, onDecrease}) => {
  return (
    <li className='cart-item'>
        <p>{item.name} - {item.quantity} x {currencyFormater.format(item.price)}</p>
        <p className='cart-item-actions'>
            <button onClick={onDecrease}>-</button>
            <span>{item.quantity}</span>
            <button onClick={onIncrease}>+</button>
        </p>
    </li>
  )
}

export default CartItem