import { useEffect, useState } from "react";
import MealItem from "./MealItem";

function Meals() {
  const [loadedMeals, setLoadedMeals] = useState([]);
  useEffect(() => {
    async function fetchMeals() {
      const response = await fetch("http://localhost:3000/meals");
      const meals = await response.json();
      setLoadedMeals(meals);
    }
    fetchMeals()
  },[]);

  return (
    <ul id="meals">
      {loadedMeals.map((meal) => {
        return (
            <MealItem key={meal.id} meal={meal}/>
        );
      })}
    </ul>
  );
}

export default Meals;
