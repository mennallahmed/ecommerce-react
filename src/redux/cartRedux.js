import {createSlice} from "@reduxjs/toolkit"

const cartSlice = createSlice({
  name:"cart",
  initialState:{
    products:[],
    quantity:0,
    total:0,
  },
  reducers:{
    addProduct:(state, action)=>{
      //Increase cart quantity number
      state.quantity += 1;
      //Add the new product to cart
      state.products.push(action.payload);
      //Calculate the total price = product price * quantity of the product
      state.total += action.payload.price * action.payload.quantity;
    }
  }
})

export const {addProduct} = cartSlice.actions;
export default cartSlice.reducer;