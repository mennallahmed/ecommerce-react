import { useEffect, useState } from "react"
import styled from "styled-components"
import { popularProducts } from "../data"
import Product from "./Product"
import axios from "axios"

const Container = styled.div`
   padding: 20px;
   display: flex;
   flex-wrap: wrap;
   justify-content: space-between;
`

const Products = ({cat,filters,sort}) =>{
   const [products, setProducts] = useState([])
   const [filteredProducts, setFilteredProducts] = useState([])

   // Run this function when category changes
   useEffect(()=>{
     //Get products from our API
     const getProducts = async () =>{
       try{
         //If there is a category value get products that match this category else get all products
         const res = await axios.get(
           cat 
           ? `http://localhost:5000/api/products?category=${cat}` 
           : "http://localhost:5000/api/products"
           )
         setProducts(res.data)
       }catch(error){
       }
     }
     getProducts()
   },[cat])

   useEffect(()=>{
     //If there is a category set filter products with product that only match our filters
     cat && setFilteredProducts( 
       products.filter((item)=> Object.entries(filters).every(([key,value])=>
         item[key].includes(value)
       )
       )
     )

   },[products,cat,filters])

   useEffect(() =>{
    if (sort === "newest")
    {
      setFilteredProducts(prev=>
        //If first one is greater it will display 
        [...prev].sort((a,b)=> a.createdAt - b.createdAt)
        )
    }
    else if (sort === "asc")
    {
      setFilteredProducts(prev=>
        //If first one is higher price it will display 
        [...prev].sort((a,b)=> a.price - b.price)
        )
    }
    else{
      setFilteredProducts(prev=>
        //If first one is lower price it will display 
        [...prev].sort((a,b)=> b.price - a.price)
        )
    }
   },[sort])

   return(
    <Container>
      {cat
       ? filteredProducts.map((item)=> <Product item={item} key={item.id} />)
       : products
          .slice(0,8)
          .map((item)=> <Product item={item} key={item.id} />)
      }
    </Container>
   )

}

export default Products