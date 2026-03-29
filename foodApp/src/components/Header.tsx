import React, { use } from 'react'
import Button from './UI/Button'
import CartContext from '../store/CartContext'
import UserProgressContext from '../store/UserProgressContext'

function Header() {
    const cartCtx = use(CartContext)
    const userProgressCtx = use(UserProgressContext)
    const totalCartItems = cartCtx.items.reduce((totalNumber,item)=>{
        return totalNumber+item.quantity
    },0)

    function showCartHandler(){
        userProgressCtx.showCart()
    }
  return (
    <header id="main-header">
        <div id="title">
            <h1>Food</h1>
        </div>
        <nav>
            <Button textOnly onClick={showCartHandler}>
                Cart ({totalCartItems})
            </Button>
        </nav>
    </header>
  )
}

export default Header