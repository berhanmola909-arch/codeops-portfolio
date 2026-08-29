import Menu from './Menu/Menu'
import Sidebar from './Sidebar/Sidebar'
import style from './Main.module.css'
function Main (){
  return(
    <div className={style.m}>
      <Sidebar/>
      <Menu/>
    </div>
  )
}
export default Main