import { useEffect } from "react"
import {BrowserRouter,Routes,NavLink,Route} from 'react-router-dom'
import { Outlet } from "react-router-dom";
function Example(){
        return(
            <>
            <nav className='project'>
        <NavLink to='/example/Country' className={active =>active.isActive ? 'active' : 'unactive'}>Country</NavLink>
        <NavLink to='/example/Currency'  className={active =>active.isActive ? 'active' : 'unactive'}>Currency convert</NavLink>
        <NavLink to='/example/Chat'  className={active =>active.isActive ? 'active' : 'unactive'}>Group Chat</NavLink>
      </nav>
            <Outlet></Outlet>
            </>
        )
}
export default Example