import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Route, Router, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import AddPlaces from './components/AddPlaces.jsx'
import AddRestaurant from './components/AddRestaurant.jsx'
import AddMarket from './components/AddMarket.jsx'
import Home from './pages/Home.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route path='/' element={<Home />}/>
      <Route path='/addplaces' element={<AddPlaces />} />
      <Route path='/addrestaurant' element={<AddRestaurant/>} />
      <Route path='/addmarket' element={<AddMarket/>} />
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}>
      <App />
    </RouterProvider>

  </React.StrictMode>,
)
