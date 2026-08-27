import Dish from './Dish/Dish'
import style from './Menu.module.css'
function Menu (){
  const Dishes = [
    { id: 1, name: 'Doro wot', price: 350 },
    { id: 2, name: 'ketifo', price: 400 },
    { id: 3, name: 'shiro', price: 150 },
    { id: 3, name: 'beyayenetu', price: 150 },
    { id: 3, name: 'mahberawi', price: 150 }


  ]
  return (
    <div className={style.dish}>
      {Dishes.map(item=>(
        <Dish name={item.name} price={item.price}/>
      ))}
    </div>
  )
}

export default Menu