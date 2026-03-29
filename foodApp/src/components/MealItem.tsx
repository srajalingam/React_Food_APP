import React, { use } from 'react'
import {currencyFormater} from "../util/formatting.js"
import Button from './UI/Button.js'
import CartContext from '../store/CartContext.js'
function MealItem({meal}) {
    const cartCtx=use(CartContext)
    function handleAddMealTOCart(){
        cartCtx.addItem(meal)
    }   
  return (
    <li className='meal-item'>
        <article>
            <img src={`http://localhost:3000/${meal.image}`} alt={meal.name}></img>
            <div>
                <h3>{meal.name}</h3>
                <p className='meal-item-price'>{currencyFormater.format(meal.price)}</p>
                <p className='meal-item-description'>{meal.description}</p>
            </div>
            <p className='meal-item-actions'>
                <Button onClick={handleAddMealTOCart}>Add to Cart</Button>
            </p>
        </article>
    </li>
  )
}

export default MealItem