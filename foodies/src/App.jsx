
import Menubar from './components/menubar/Menubar.jsx'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Contact from './pages/Contact.jsx'
  import FoodDetails from './pages/FoodDetails.jsx'

import ExplorePage from './pages/ExplorePage' 
import Cart from './pages/Cart/Cart.jsx'
import Register from './pages/Register.jsx'
import Login from './pages/Login.jsx'
function App() {
  return (
    <div>
      <Menubar />
      <Routes>
        <Route path='/' element={<Home></Home>}></Route>
          <Route path='/contact' element={<Contact></Contact>}></Route>
<Route path="/explore" element={<ExplorePage />} />             
   <Route path='/food/:id' element={<FoodDetails />} />
      <Route path='/cart' element={<Cart />} />
    
<Route path="/register" element={<Register />} />


<Route path="/login" element={<Login />} />
      </Routes>
    </div>
  )
}

export default App