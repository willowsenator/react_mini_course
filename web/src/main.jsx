import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import {Home} from './components/Home'
import { Product } from './components/Product'
import {QueryClient, QueryClientProvider} from 'react-query'
import { Balance } from './components/Balance'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home></Home>}> 
              <Route path='/products' element={<Product></Product>}></Route>
              <Route path='/eth_balance' element={<Balance></Balance>}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>,
)
