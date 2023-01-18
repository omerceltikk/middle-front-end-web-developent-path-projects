import React from 'react'
import { Link,Routes,Route,useMatch } from 'react-router-dom'
import styles from "./styles.module.css"
import { Box } from '@chakra-ui/react'
import Home from './Home'
import Products from './Products'
import Orders from './Orders'
import ProductDetail from './ProductDetail'
import NewProducts from './Products/NewPro'

function Admin() {
  return (
    <div>
        <nav>
            <ul className={styles.admin}>
                <li>
                    <Link to="/admin">
                        Home
                    </Link>
                </li>
                <li>
                    <Link to="/admin/orders">
                        Orders
                    </Link>
                </li>
                <li>
                    <Link to="/admin/products">
                        Products
                    </Link>
                </li>
            </ul>
        </nav>

    <Box mt="10">
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/orders" element={<Orders/>}/>
            <Route path="/products" element={<Products/>}/>
            <Route path="/products/new" element={<NewProducts/>}/>
            <Route path="/products/:product_id" element={<ProductDetail/>}/>
        </Routes>
    </Box>
    </div>
  )
}

export default Admin