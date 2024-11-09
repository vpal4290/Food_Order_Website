import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import {Route, Routes} from 'react-router-dom';
import './App.css'
import Navbar from './Components/Navbar/Navbar'
import Sidebar from './Components/Sidebar/Sidebar'
import Order from './Pages/Order/Order';
import List from './Pages/List/List';
import Add from './Pages/Add/Add';
import Welcome from './Pages/Welcome/Welcome';
import { ToastContainer } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
const App=()=>{
  const url='http://localhost:4000';
  return(
    <div>
      <ToastContainer />
      <Navbar />
      <hr />
      <div className='app-content'>
       <Sidebar />
       <Routes>
          <Route path='/' element={<Welcome />} /> 
          <Route path='/add' element={<Add url={url}/>}></Route>
          <Route path='/order' element={<Order url={url}/>}></Route>
          <Route path='/list' element={<List url={url}/>}></Route>
       </Routes>
       </div>
    </div>
  )
}

export default App
