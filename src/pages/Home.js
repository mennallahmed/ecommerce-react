import React from "react"
import Navbar from "../components/Navbar"
import Annoucement from "../components/Annoucement"
import Slider from "../components/Slider"
import Categories  from "../components/Categories"
import Products from "../components/Products"



const Home = () => {
  return(
    <div>
      <Annoucement/>
      <Navbar/>
      <Slider/>
      <Categories/>
      <Products/>
    </div>
  )
}

export default Home