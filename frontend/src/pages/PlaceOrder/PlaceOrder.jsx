import React, { useContext, useEffect, useState } from 'react'
import "./PlaceOrder.css";
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
const PlaceOrder = () => {
  const {gettotalCartAmount,deliveryFee,token,food_list,cartItems,url,calculateDiscountedTotal}=useContext(StoreContext);

  const [data,setData]=useState({
    firstName:"",
    lastName:"",
    email:"",
    street:"",
    city:"",
    state:"",
    zipcode:"",
    country:"",
    phone:""
  })
  const onChangeHandler=(event)=>{
    const name=event.target.name;
    const value=event.target.value;
    setData(data=>({...data,[name]:value}))
  }
  const placeOrder=async(event)=>{
     event.preventDefault();
     const orderItems = cartItems.map(cartItem => {
      const foodItem = food_list.find(item => item.name === cartItem.name);
      if (foodItem) {
        return {
          ...foodItem,
          quantity: cartItem.quantity
        };
      }
      return null;
    }).filter(item => item !== null);

    console.log(orderItems);
    let orderData={
      address:data,
      items:orderItems,
      amount:gettotalCartAmount()+2,
      }
      let response=await axios.post(url+"/order/place",orderData,{headers:{token}})
      if(response.data.success){
        const {session_url}=response.data;
        window.location.replace(session_url);
      }
      else
      {
        alert("Error");
      }
  };
  

  // useEffect(()=>{
  //   console.log(data);
  // },[])
  return (
    <form onSubmit={placeOrder} className='place-order'>
      <div className="place-order-left">
           <p className="title">
            Delivery Information
           </p>
          <div className="multi-fields">
            <input required name='firstName' onChange={onChangeHandler} value={data.firstName} type="text" placeholder='First Name' />
            <input required name='lastName' onChange={onChangeHandler} value={data.lastName} type="text" placeholder='Last Name' />
          </div>
          <input required name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Email Address' />
          <input required name='street' onChange={onChangeHandler} value={data.street} type="text"  placeholder='Street'/>
          <div className="multi-fields">
            <input required name='city' onChange={onChangeHandler} value={data.city} type="text" placeholder='City' />
            <input required name='state' onChange={onChangeHandler} value={data.state} type="text" placeholder='State' />
          </div>
          <div className='multi-fields'>
          <input required name='zipcode' onChange={onChangeHandler} value={data.zipcode} type="text" placeholder='Zip Code' />
          <input required name='country' onChange={onChangeHandler} value={data.country} type="text" placeholder='Country' />
          </div>
         <input name='phone' onChange={onChangeHandler} value={data.phone} type="text"  placeholder='Phone' />
      </div>
      <br></br>
      <br></br>
       <div className="place-order-right">
       <div className='cart-total'>
          <h2>Cart Total</h2>
          <div className="cart-total-details">
            <p>Subtotal</p>
            <p>{calculateDiscountedTotal()}</p>
          </div>
          <hr />
          <div className="cart-total-details">
            <p>Delivery Fee</p>
            <p>{deliveryFee()}</p>
          </div>
          <hr />
          <div className="cart-total-details">
            <p>Total</p>
            <p>{calculateDiscountedTotal()+deliveryFee()}</p>
          </div>
          <button type='submit'>Proceed to checkout</button>
          <hr />
        </div>
       </div>
    </form>
  )
}

export default PlaceOrder