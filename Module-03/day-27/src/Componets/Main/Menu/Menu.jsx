import Dish from './Dish/Dish'
import style from './Menu.module.css'
import { Dishes } from './data'
function Menu (){
 const shown = Dishes.filter(dish=>dish.category === "Main")
 if(shown.length === 0){
  return(<h2>the category is empty</h2>) 
 }
 
  return (
    <div className={style.dish}>
      {shown.map(item=>(
        <Dish name={item.name} price={item.price}/>
      ))}
    </div>
  )
}

export default Menu
