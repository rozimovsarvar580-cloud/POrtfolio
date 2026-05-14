import Work from './Work'
import Info from './Info'
import {BrowserRouter,Routes,NavLink,Route} from 'react-router-dom'
import './App.css'
import Example from './example'
import Country from "./country"
import Currency from "./Currecy"
function App() {
  return (
  <BrowserRouter>
  <div className="name">
    <h1>Sarvar Rozimov</h1>
    <h2>FrontEnd Developer</h2>
  </div>
      <nav className='Navbar'>
        <div className="fixed">
        <NavLink to='/Work' className={active =>active.isActive ? 'active' : 'unactive'}><div className='work'>Work</div></NavLink>
        <NavLink to='/' className={active =>active.isActive ? 'active' : 'unactive'} ><div className='info'>Info</div></NavLink>
        <NavLink to='/example' className={active =>active.isActive ? 'active' : 'unactive'} ><div className='example'>Example</div></NavLink>
        </div>
      </nav>
      <Routes>
        <Route path='/Work' element={<Work></Work>}></Route>
        <Route path='/' element={<Info></Info>}></Route>
        <Route path='/example/*' element={<Example></Example>}>
         <Route path="Country" element={<Country></Country>} />
         <Route path="Currency" element={<Currency></Currency>} />
        </Route>
      </Routes>
    <div className='footer'>© 2026 Sarvar Rozimov. All Rights Reserved.</div>
    </BrowserRouter>
    
  )
}

export default App
